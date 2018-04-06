const express = require('express')
const next = require('next')
const routes = require('./routes')

const dev = process.env.NODE_ENV !== 'production'
const PORT = process.env.PORT || 3000
const app = next({ dev })
const handler = routes.getRequestHandler(app)

app.prepare()
.then(() => {
  const server = express()

  server.use(handler);

  server.listen(PORT, (err) => {
    if (err) throw err
    console.log('> Ready on :'+PORT+" in "+process.env.NODE_ENV+" mode")
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})