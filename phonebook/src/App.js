import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

  // it should add the name to the persons array when add button is clicked
  const addContact = (event) => {
    event.preventDefault()
    const contact = {
      name: newName
    }

    setPersons(persons.concat(contact))
    setNewName('')
  }

  // input should change state
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* it should display the person name */}
      {persons.map(name =>
        <p key={name.name}>{name.name}</p>
      )}
    </div>
  )
}

export default App