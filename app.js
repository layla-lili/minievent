  const express = require('express')
  const bodyParser = require('body-parser')
  const app = express()
  const port = 8000
  
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )


///////////////////////////////
const db = require('./db/queries')

//////////////////////////////

  
  app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
  })
  
  app.get('/Events', db.getUsers)
  app.get('/Events/:id', db.getUserById)
  app.post('/Events', db.createUser)
  app.put('/Events/:id', db.updateUser)
  app.delete('/Events/:id', db.deleteUser)
  
  app.listen(port, () => {
    console.log(`App running on port ${port}.`)
  })