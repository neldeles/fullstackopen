import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '8996790' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  // it should add the name to the persons array when add button is clicked
  const addContact = (event) => {
    event.preventDefault()
    if (persons.map(person => person.name).includes(newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      const contact = {
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(contact))
    }
    setNewName('')
    setNewNumber('')
  }

  // input should change state
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
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
      <h2>Numbers</h2>
      {/* it should display the person name */}
      {persons.map(person =>
        <p key={person.name}>{person.name} {person.number} </p>
      )}
    </div>
  )
}

export default App