var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var VerifyToken = require('../auth/VerifyToken');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
var Form = require('./Form');

router.get('/my', VerifyToken, (req, res, next) => 
    Form.find(
        {createdBy: req.userId},
        (err, forms) => {
            err && res.status(500).send(err);
            !forms && res.status(404).send({msg: "No forms found."});
            res.status(200).send(forms);
        }
    )
);

router.post('/create', VerifyToken, (req, res, next) => {
    let url = req.body.name.replace(/\s+/g, '_').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9_]+/g, "");
    Form.findOne({url}, (err, form) => {
        if(form){
            return res.status(500).send({msg: "This url already exists."});
        }else{
            Form.create({
            name: req.body.name,
            url: url,
            description: req.body.description,
            createdBy: req.userId
            },
            (err, form) => {
                if (err) return res.status(500).send(err);
                res.status(200).send(form);
            })
        }
        
    })
}
);




module.exports = router;