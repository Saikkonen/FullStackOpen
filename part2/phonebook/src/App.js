import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  )
}

const PersonForm = ({
  addNewNumber,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) => {
  return (
    <form onSubmit={addNewNumber}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ filteredPersons }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(response => {
        setPersons(response)
      })
  }, [])

  const addNewNumber = (event) => {
    event.preventDefault()

    if (newName === '') {
      alert('Name cannot be empty')
      return
    }

    if (persons.some((item) => item.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newNames = {
      name: newName,
      number: newNumber,
    }

    personService
    .create(newNames)
    .then(response => {
      console.log(response)
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
    })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const filteredPersons = persons.filter((person) =>
    person.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>Add new</h2>
      <PersonForm
        addNewNumber={addNewNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} />
    </div>
  )
}

export default App
