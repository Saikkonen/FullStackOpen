import { useState, useEffect } from 'react'
import countriesService from './services/countries'

const Countries = ({ countries, handleShowClick }) => {

  if (countries.length > 10){
    return (
      <div>
        Too many countries, specify another filter
      </div>
    )
  } else if (countries.length > 1) {
    return (
      <div>
      {countries.map((country) => (
        <p key={country.name.common}>
          {country.name.common} <button onClick={() => handleShowClick(country)}>Show</button>
        </p>
      ))}
    </div>
    )
  } else if (countries.length === 1) {
    const country = countries[0]
    const languages = country.languages
    const flag = country.flags
    
    return (
      <div>
        <h2>{country.name.common}</h2>
        <div>
          capital {country.capital} <br />
          area {country.area} <br />
        </div>
        <div>
          <h3>languages:</h3>
          <ul>
            {Object.entries(languages).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={flag.png} alt={flag.alt} />
        </div>
      </div>
    )
  }
}

function App() {
  const [countries, setCountries] = useState([])
  const [searchTerm, setNewSearchTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState(countries)

  const handleSearchChange = (event) => {
    setNewSearchTerm(event.target.value)
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setFilteredCountries(filtered)
  }

  const handleShowClick = (country) => {
    setFilteredCountries([country])
  }

  useEffect(() => {
    countriesService
      .getCountries()
      .then(response => {
        setCountries(response)
      })
  }, [])

  return (
    <div>
      Find countries <input value={searchTerm} onChange={handleSearchChange} />
      <Countries countries={filteredCountries} handleShowClick={handleShowClick}/>
    </div>
  )
}

export default App
