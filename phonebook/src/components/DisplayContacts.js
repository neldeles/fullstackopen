import React from 'react'

const DisplayContact = ({ id, name, number, deleteContact }) => {
  return (
    <p>
      {name} {number} <button onClick={() => deleteContact(name, id)}>delete</button>
    </p>
  )
}

const DisplayContacts = ({ contactList, newFilter, deleteContact }) => {
  const contactsToShow =
    contactList.filter(person =>
      person.name.toLowerCase()
        .includes(
          newFilter.toLowerCase()
        )
    )

  return (
    <div>
      {contactsToShow.map(person =>
        <DisplayContact
          key={person.id}
          id={person.id}
          name={person.name}
          number={person.number}
          deleteContact={deleteContact}
        />
      )}
    </div>
  )
}

export default DisplayContacts