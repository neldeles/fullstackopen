import React, { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayCountries = ({ countries, newFilter }) => {
  const countriesToShow =
    countries.filter(country =>
      country.name.toLowerCase()
        .includes(
          newFilter.toLowerCase()
        )
    )

  if (countriesToShow.length > 10) {
    return (
      <p>
        Too many matches, make search term more specific
      </p>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <div>
        {countriesToShow.map(country =>
          <div key={country.name}>
            <h1>{country.name}</h1>
            <p>{country.capital}</p>
            <p>{country.population}</p>
            <h2>languages</h2>
            <ul>
              {country.languages.map(lang =>
                <li key={lang.name}>
                  {lang.name}
                </li>
              )}
            </ul>
            <img
              src={country.flag}
              alt="new"
            />
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div>
        {countriesToShow.map(country =>
          <p key={country.name}>
            {country.name}
          </p>
        )}
      </div>
    )
  }

}

const App = () => {
  // state for the countries object
  const [countries, setCountries] = useState([])
  // state for the search field
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
      />
    </div>
  );
}

export default App;
