import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DisplayCountries from './components/DisplayCountries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise')
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      find countries <input onChange={handleFilterChange} />
      <DisplayCountries
        countries={countries}
        newFilter={newFilter}
        handleShowClick={setNewFilter}
      />
    </div>
  );
}

export default App;
