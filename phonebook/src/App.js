import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import DisplayContacts from './components/DisplayContacts'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const addContact = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const contact = {
        name: newName,
        number: newNumber
      }

      personsService
        .create(contact)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
        })
    }
    console.log('contact added')
    setNewName('')
    setNewNumber('')
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

  const deleteContact = (name, id) => {
    const result = window.confirm(`delete ${name}?`)
    if (result) {
      console.log(`deleted ${name}`)
      personsService.del(id)
      personsService
        .getAll()
        .then(returnedContact => {
          setPersons(returnedContact)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilterChange} />

      <h2>add a new contact</h2>
      <PersonForm
        onSubmit={addContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <DisplayContacts
        contactList={persons}
        newFilter={newFilter}
        deleteContact={deleteContact}
      />
    </div>
  )
}

export default App