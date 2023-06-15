require('dotenv').config()
const Person = require('./models/person')
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
  Person.find({}).then(result => {
    response.json(result)
  })
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    response.json(person)
  })
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
