var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../user/User');

var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var config = require('../config');
var VerifyToken = require('./VerifyToken');

var fetch = require('node-fetch');

router.post('/register', (req, res) => {
    var hashedPassword = bcrypt.hashSync(req.body.password, 8);
    
    User.create({
      name : req.body.name,
      email : req.body.email,
      password : hashedPassword
    },
    (err, user) => {
      if (err) return res.status(500).send(err);
      // create a token
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      return res.status(200).send({ auth: true, token: token });
    }); 
});

router.get('/me', VerifyToken, (req, res, next) => 
    User.findById(
        req.userId,
        { password: 0 },
        (err, user) => {
            if(err) return res.status(500).send(err);
            if(!user) return res.status(404).send({msg: "No user found."});
            return res.status(200).send(user);
        }
    )
);

router.post('/remove', VerifyToken, (req, res, next) => 
    User.remove(
        {_id: req.userId},
        (err, user) => {
            if(err) return res.status(500).send(err);
            if(!user) return res.status(404).send({msg: "No user found."});
            return res.status(200).send({msg: "Successfully removed", user: user});
        }
    )
);

router.post('/login', (req, res) => {
    let { password, email } = req.body;
    if(!password || !email){
      return res.status(500).send({msg: 'Fill both email and password.'})
    }
    User.findOne({ email: req.body.email }, (err, user) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send({msg: 'User not found.'});
      if (user.facebook.id) return res.status(500).send({msg: "Use facebook to login."});
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
      if (!passwordIsValid) return res.status(401).send({ auth: false, token: null, msg: "Password not valid." });
      var token = jwt.sign({ id: user._id }, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      return res.status(200).send({ auth: true, token: token });
    });
});

router.get('/logout', (req, res) => res.status(200).send({ auth: false, token: null }));

router.post('/fb', (req, res)=>{
    !req.body.accessToken && res.status(500).send({msg: 'No facebook access token provided!'});
    const url="https://graph.facebook.com/v2.12/me?access_token="+req.body.accessToken+"&debug=all&fields=id%2Cname%2Cemail&format=json&method=get";
    fetch(url)
    .then(resp=>resp.json())
    .then(resp=>{
      //check if valid facebook response
      if(!resp.error){
        User.findOne({ email: resp.email }, (err, user) => {
          //if user by email provided by facebook not found
          if (!user){
            User.create({
              name : resp.name,
              email : resp.email,
              facebook: {
                id: resp.id,
                token: req.body.access_token
              }
            },
            (err, userCreated) => {
              if (err) return res.status(500).send(err)
              // create a token
              console.log("User not found, created a new one:", userCreated);
              var token = jwt.sign({ id: userCreated._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: true, token: token });
            });
          }else{
            console.log("User found by facebook: ", user);
            var token = jwt.sign({ id: user._id }, config.secret, {
              expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: true, token: token });
          };
        });
      }else{
        res.status(500).send({msg: "Invalid facebook token provided."})
      }
    })
    .catch(err=>res.status(500).send(err))
    
})

module.exports = router;