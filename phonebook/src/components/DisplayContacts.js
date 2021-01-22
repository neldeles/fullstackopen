import React from 'react'

const DisplayContact = ({ name, number }) => {
  return (
    <p>
      {name} {number}
    </p>
  )
}

const DisplayContacts = (props) => {
  return (
    <div>
      {props.contactList.map(person =>
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