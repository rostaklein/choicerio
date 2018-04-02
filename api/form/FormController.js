var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Form = require('./Form');
var Question = require('./Question');
var Candidate = require('./Candidate');

router.get('/my', VerifyToken, (req, res, next) => 
    Form.find(
        {createdBy: req.userId})
        .populate('createdBy')
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
        .populate('createdBy')
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




module.exports = router;