const express = require('express')
const next = require('next')
const cors = require('cors');
const bodyParser = require("body-parser");
var cookieParser = require('cookie-parser')

var UserController = require('./api/user/UserController');
var FormController = require('./api/form/FormController');
var AuthController = require('./api/auth/AuthController');

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
.then(() => {
  const server = express()
  var db = require('./api/db');
  server.use(bodyParser.urlencoded({
      extended: true
  }));
  server.use(cookieParser())
  server.use(cors());
  server.options('*', cors());

  
  server.use('/api/users', UserController);
  server.use('/api/form', FormController);
  server.use('/api/auth', AuthController);


  server.get('/q/:id', (req, res) => {
    const actualPage = '/form'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })
  server.get('/q/:id/edit', (req, res) => {
    const actualPage = '/form'
    const queryParams = { id: req.params.id, edit: true }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})