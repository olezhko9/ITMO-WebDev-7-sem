import axios from 'axios';

export function fetchWeather(location) {
  let url = ''

  if (Array.isArray(location)) {
    url = `http://localhost:9000/weather/coordinates?lat=${location[0]}&lon=${location[1]}`
  } else if (typeof location === 'string' && location.length) {
    url = `http://localhost:9000/weather?city=${location}`
  } else return

  return axios.get(url)
}
