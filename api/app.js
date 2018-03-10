var express = require('express');
var app = express();
var db = require('./db');
const cors = require('cors');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser())

app.use(cors());
app.options('*', cors());

var UserController = require('./user/UserController');
app.use('/api/users', UserController);
var AuthController = require('./auth/AuthController');
app.use('/api/auth', AuthController);

module.exports = app;