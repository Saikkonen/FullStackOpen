const express = require('express')
const app = express()

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
]

app.use(express.json())

app.get('/info', (request, response) => {
  const currentDate = new Date()
  const personsAmount = persons.length
  response.send(`
  <p>Phonebook has info for ${personsAmount} people</p>
  <p>${currentDate}</p>
  `)
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.post('/api/persons', (request, response) => {
  const id = Math.floor(Math.random() * 100000000)
  const name = request.body.name
  const number = request.body.number
  
  const newPerson = {
    id: id,
    name: name,
    number: number,
  }

  if (!name || !number) {
    return response.status(400).json({ error: 'Name or number is missing' });
  }

  if (persons.some(person => person.name === name)) {
    return response.status(400).json({ error: 'Name must be unique' })
  }

  persons = persons.concat(newPerson)
  console.log(persons)

  response.status(201).end()
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
