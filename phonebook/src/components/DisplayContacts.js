import React from 'react'

const DisplayContact = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  )
}

const DisplayContacts = ({ contactList, newFilter }) => {
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
          key={person.name}
          name={person.name}
          number={person.number}
        />
      )}
    </div>
  )
}

export default DisplayContacts