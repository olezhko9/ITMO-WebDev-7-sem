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

export function getFavorites() {
  const url = "http://localhost:9000/favorites"
  return axios.get(url)
}


export function addToFavorites(city) {
  const url = "http://localhost:9000/favorites"
  return axios.post(url, {
    name: city
  })
}

export function removeFromFavorites(city) {
  const url = "http://localhost:9000/favorites"
  return axios.delete(url, {
    data: {
      name: city
    }
  })
}
