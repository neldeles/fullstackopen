import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import DisplayContacts from './components/DisplayContacts'
import SuccessNotif from './components/SuccessNotif'
import ErrorNotif from './components/ErrorNotif'
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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

    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      const result = window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)
      if (result) {
        // find the object with the same name
        const contact = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
        // update the contact number of that object
        const updatedContact = { ...contact, number: newNumber }
        personsService
          .update(updatedContact)
          .then(returnedContact => {
            setPersons(persons.map(person =>
              person.id !== contact.id
                ? person
                : returnedContact
            ))
          })
          .then(success => {
            console.log(success)
            setSuccessMessage(`${newName} has been updated.`)
            setTimeout(() => {
              setSuccessMessage(null)
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
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
        })
      setSuccessMessage(`${newName} has been added.`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 3000)
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
    const result = window.confirm(`delete ${name}?`)
    if (result) {
      console.log(`deleted ${name}`)
      personsService
        .del(id)
        .then(response => {
          personsService
            .getAll()
            .then(returnedPersons => {
              setPersons(returnedPersons)
            })
        })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <SuccessNotif message={successMessage} />
      <ErrorNotif message={errorMessage} />
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