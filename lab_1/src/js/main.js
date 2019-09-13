import getWeather from './weather'

const searchBtn = document.getElementById('search-btn')
const cityInput = document.getElementById('city-input')

searchBtn.onclick = () => getWeather(cityInput.value)
