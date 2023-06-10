import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/weather'

const Countries = ({ countries, handleShowClick }) => {
  const [weather, setWeather] = useState(null)

  const fetchWeather = (city) => {
    weatherService.getWeather(city)
      .then(response => {
        setWeather(response)
      })
      .catch(error => {
        console.error('Failed to fetch weather:', error)
      })
  }

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0]
      const capital = country.capital[0]
      fetchWeather(capital)
    } else {
      setWeather(null)
    }
  }, [countries])

  if (countries.length > 10) {
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
          Capital city: {country.capital} <br />
          Surface area: {country.area} km² <br />
        </div>
        <div>
          <h3>Languages:</h3>
          <ul>
            {Object.entries(languages).map(([key, value]) => (
              <li key={key}>{value}</li>
            ))}
          </ul>
        </div>
        <div>
          <img src={flag.png} alt={flag.alt} />
        </div>
        <div>
          <h3>Weather in {country.capital}</h3>
          {weather ? (
            <div>
              Temperature: {weather.main.temp} °C
              <div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
              </div>
              Wind: {weather.wind.speed} m/s
            </div>
          ) : (
            <div>Loading weather information...</div>
          )}
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
    countriesService.getCountries()
      .then(response => {
        setCountries(response)
        setFilteredCountries(response)
      })
      .catch(error => {
        console.error('Failed to fetch countries:', error)
      })
  }, [])

  return (
    <div>
      Find countries <input value={searchTerm} onChange={handleSearchChange} />
      <Countries countries={filteredCountries} handleShowClick={handleShowClick} />
    </div>
  )
}

export default App
