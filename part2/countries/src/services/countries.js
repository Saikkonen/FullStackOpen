import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/'

const getCountries = () => {
  const request = axios.get(baseUrl+'all')
  return request.then(response => response.data)
}

const countriesService = {
  getCountries
}

export default countriesService