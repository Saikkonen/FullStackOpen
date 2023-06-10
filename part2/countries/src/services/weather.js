import axios from 'axios'
const baseUrl = 'https://api.openweathermap.org/data/2.5/'
const api_key = process.env.REACT_APP_API_KEY

const getWeather = (city) => {
  const url = baseUrl+`weather?q=${city}&appid=${api_key}&units=metric`
  const request = axios.get(url)
  return request.then(response => response.data)
}

const weatherService = {
  getWeather
}

export default weatherService