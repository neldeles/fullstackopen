import React from 'react'
import WeatherData from './WeatherData'

const DisplayCountries = ({ countries, newFilter, handleShowClick }) => {
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
            <WeatherData country={country.capital} />
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
            <button onClick={() => handleShowClick(country.name)}>show</button>
          </p>
        )}
      </div>
    )
  }
}

export default DisplayCountries