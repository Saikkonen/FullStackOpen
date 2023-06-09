import { useState, useEffect } from 'react'
import personService from './services/persons'
import './index.css'

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

const Persons = ({ filteredPersons, deletePerson }) => {
  return (
    <div>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="notification">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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

    const newNames = {
      name: newName,
      number: newNumber,
    }

    if (persons.some((item) => item.name === newName)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with the new one?`)) {
        const filteredPerson = persons.filter(person => person.name === newName)
        const id = filteredPerson[0].id
        personService
        .update(id, newNames)
        .then(response => {
          setPersons(persons.filter(person => person.id !== id).concat(response))
          setErrorMessage(`Changed ${newName}'s number`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
      return
    }

    personService
    .create(newNames)
    .then(response => {
      setPersons(persons.concat(response))
      setNewName('')
      setNewNumber('')
      setErrorMessage(`Added ${newName}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }

  const deletePerson = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const name = filteredPerson[0].name

    if (window.confirm(`Delete ${name}?`)) {
      personService.remove(id)
      setPersons(persons.filter(person => person.id !== id))
      setErrorMessage(`Deleted ${name}`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
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
      <Notification message={errorMessage} />
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
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson} />
    </div>
  )
}

export default App
