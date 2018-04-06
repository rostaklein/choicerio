const routes = module.exports = require('next-routes')()

routes
.add('/q/:id', 'form')
.add('/q/:id/:action', 'form')
.add('/q/:id/:action/:stepnumber', 'form')