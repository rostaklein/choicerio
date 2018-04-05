var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Form = require('./Form');
var Question = require('./Question');
var Candidate = require('./Candidate');

const isValid = form => {
        if(
            !form.questions ||
            !form.candidates ||
            !form.name ||
            form.questions.length<2 ||
            form.candidates.length<2 ||
            form.name.length<3
        ){
            return false;
        }else{
            return true;
        } 
}

router.get('/my', VerifyToken, (req, res, next) => 
    Form.find(
        {createdBy: req.userId})
        .populate('questions')
        .populate('candidates')
        .exec((err, forms) => {
            if(err) return res.status(500).send(err);
            if(!forms) return res.status(404).send({msg: "No forms found."});
            return res.status(200).send(forms);
        }
    )
);

router.get('/byurl/:url', (req, res, next) => 
    Form.findOne(
        {url: req.params.url})
        .populate('createdBy', '-password -__v')
        .populate('questions')
        .populate('candidates')
        .exec((err, form) => {
            if(err) return res.status(500).send(err);
            if(!form) return res.status(404).send({msg: "No form found for "+req.params.url});
            return res.status(200).send(form);
        }
    )
);

router.post('/create', VerifyToken, (req, res, next) => {
    //validation
    if(!isValid(req.body)) return res.status(500).send({msg: "Form not valid"});
    
    let url = req.body.name.replace(/\s+/g, '_').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_]+/g, "");
    Form.findOne({url}, (err, form) => {
        if(form){
            return res.status(500).send({msg: "Form with this name already exists. Enter a new name, please."});
        }else{
            Promise.all([
                new Promise((resolve, rej) =>{
                    Question.insertMany(req.body.questions, (err, questions) => {
                        if(err) rej(err);
                        resolve(questions);
                    })
                }),
                new Promise((resolve, rej) => {
                    Candidate.insertMany(req.body.candidates, (err, candidates) => {
                        if(err) rej(err);
                        resolve(candidates);
                    })
                })
            ]).then(resp =>{
                Form.create({
                    name: req.body.name,
                    url: url,
                    description: req.body.description,
                    createdBy: req.userId,
                    questions: resp[0].map(item=>item._id),
                    candidates: resp[1].map(item=>item._id)
                },
                (err, form) => {
                    if (err) return res.status(500).send(err);
                    return res.status(200).send(form);
                })
            })
            
            
        }
        
    })
}
);

router.delete('/:id', VerifyToken, (req, res, next) => {
        Form.findByIdAndRemove(req.params.id)
            .exec((err, form) => {
                if(err) return res.status(500).send(err);
                if(!form) return res.status(404).send({msg: "No form found for "+req.params.url});
                if(req.userId!=form.createdBy){
                    return res.status(401).send({msg: "You are not authorized to delete this form."});
                }
                form.questions.forEach(question=>{
                    Question.findByIdAndRemove(question, (err, q)=>{
                        //console.log("Removed question: ", q)
                    })
                })
                form.candidates.forEach(candidate=>{
                    Candidate.findByIdAndRemove(candidate, (err, q) => {
                        //console.log("Removed candidate: ", q)
                    })
                })
                return res.status(200).send({msg: "Form deleted", form});
            }
        )
    }
);

router.put('/:id', VerifyToken, (req, res, next) => {
    if(!isValid(req.body)) return res.status(500).send({msg: "Form not valid"});
        Form.findById(req.params.id)
            .exec((err, form) => {
                if(err) return res.status(500).send(err);
                if(!form) return res.status(404).send({msg: "No form found for "+req.params.url});
                if(req.userId!=form.createdBy){
                    return res.status(401).send({msg: "You are not authorized to update this form."});
                }

                //decide what to do with every subitem (questions, candidates) sent (create/update/delete)
                let separation = {
                    create: {},
                    update: {},
                    delete: {}
                };
                let schemas = {
                    questions: Question,
                    candidates: Candidate
                };

                Object.entries(schemas).forEach(([ key, schema ]) => {
                    separation.create[key] = req.body[key].filter(q=>!q._id);
                    separation.update[key] = req.body[key].filter(q=>q._id);
                    separation.delete[key] = form[key].filter(item=>!req.body[key].map(item=>String(item._id)).includes(String(item)))
                })

                //CREATE NEW ITEMS
                Promise.all(
                    [
                    //create
                    ...Object.entries(separation.create).map(([ key, items ]) => 
                        new Promise((resolve, rej) =>{
                            schemas[key].insertMany(items, (err, insertedItems) => {
                                if(err) rej(err);
                                resolve({[key]: insertedItems});
                            })
                        })
                    ),
                    //update
                    ...Object.entries(separation.update).map(([ key, items ]) => 
                        new Promise((resolve, rej) =>{
                            Promise.all(
                                items.map(itemToUpdate =>
                                    new Promise((resItem, rejItem) => {
                                        schemas[key].findByIdAndUpdate(itemToUpdate._id, itemToUpdate, (err, updatedItem) => {
                                            if(err) rejItem(err);
                                            //console.log("Updating by id: ", itemToUpdate._id);
                                            //console.log("Updated item: ", updatedItem);
                                            resItem(updatedItem);
                                        })
                                    })
                                )
                            ).then(data=>{
                                //console.log("Updated these:", data);
                                resolve({[key]: data});
                            })
                        })
                    ),
                    //delete
                    ...Object.entries(separation.delete).map(([ key, items ]) => 
                        new Promise((resolve, rej) =>{
                            Promise.all(
                                items.map(itemToDelete =>
                                    new Promise((resItem, rejItem) => {
                                        schemas[key].findByIdAndRemove(itemToDelete, (err, deletedItem) => {
                                            if(err) rejItem(err);
                                            resItem(deletedItem);
                                        })
                                    })
                                )
                            ).then(data=>{
                                //console.log("Deleted these:", data);
                                resolve({deleted: data});
                            })
                        })
                    )
                    ]
                ).then(data=>{
                    //console.log("---- DATA -----");
                    const childArrays = data
                            .map(item => Object.entries(item))
                            .reduce((curr, acc)=>acc.concat(curr), [])
                            .reduce((acc, [key, value])=>{
                                if(acc[key]){
                                    acc[key]=[...acc[key], ...value]
                                }else{
                                    acc[key]=value
                                };
                                return acc;
                            }, {});
                    Form.findByIdAndUpdate(req.params.id, {
                        name: req.body.name,
                        description: req.body.description,
                        candidates: childArrays.candidates.filter(q=>q).map(item=>item._id) || [],
                        questions: childArrays.questions.filter(q=>q).map(item=>item._id) || []
                    }, (err, form) => {
                        if (err) return res.status(500).send(err);
                        Form.findById(req.params.id)
                            .populate("questions")
                            .populate("candidates")
                            .populate("createdBy", '-password -__v')
                            .exec((err, updatedForm) => {
                            if (err) return res.status(500).send(err);
                            return res.status(200).send(updatedForm);
                        })
                    })
                })
                

                
            }
        )
    }
);



module.exports = router;