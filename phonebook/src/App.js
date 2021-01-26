import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import DisplayContacts from './components/DisplayContacts'
import Notifications from './components/Notification'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  const hook = () => {
    personsService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addContact = (event) => {
    event.preventDefault()

    const existing = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    if (existing) {
      const ok = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      if (ok) {
        // update the contact number of that object
        const updatedContact = { ...existing, number: newNumber }
        personsService
          .update(updatedContact)
          .then(returnedContact => {
            setPersons(persons.map(person =>
              person.id !== existing.id
                ? person
                : returnedContact
            ))
            notifyWith(`${newName} has been updated`)
          })
          .catch(error => {
            notifyWith(`Information of ${newName} has already been removed from server`, 'error')
          })
      }
    } else {
      const contact = {
        name: newName,
        number: newNumber
      }

      personsService
        .create(contact)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          notifyWith(`${newName} has been added.`)
        })
    }
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

  const handleDelete = (name, id) => {
    const ok = window.confirm(`delete ${name}?`)
    if (ok) {
      console.log(`deleted ${name}`)
      personsService
        .del(id)
        .then(response => {
          setPersons(persons.filter(p => p.id !== id))
          notifyWith(`Deleted ${name}`)
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notifications notification={notification} />
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
        deleteContact={handleDelete}
      />
    </div>
  )
}

export default App