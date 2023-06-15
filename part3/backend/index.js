require('dotenv').config()
const person = require('./models/person')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('content', function getContent (req) {
  var content = JSON.stringify(req.body)

  if(content === '{}') {
    return null
  }
  
  return content
})

app.use(cors())
app.use(express.json())
app.use(express.static('build'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

app.get('/info', (request, response) => {
  const currentDate = new Date()
  const personsAmount = persons.length
  response.send(`
  <p>Phonebook has info for ${personsAmount} people</p>
  <p>${currentDate}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  person.find({}).then(result => {
    response.json(result)
  })
})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 100000000)
  const name = request.body.name
  const number = request.body.number
  
  if (!name || !number) {
    return response.status(400).json({ error: 'Name or number is missing' });
  }

  if (persons.some(person => person.name === name)) {
    return response.status(400).json({ error: 'Name must be unique' })
  }

  const newPerson = {
    id: id,
    name: name,
    number: number,
  }

  persons = persons.concat(newPerson)

  response.json(newPerson)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const initialLenght = persons.length

  persons = persons.filter(person => person.id !== id)

  if (initialLenght === persons.length) {
    return response.status(404).end()
  }
  response.status(204).end()
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
