import getWeather from './weather'
import render from './weather-renderer'

$(function () {
  $('#search-btn').click(async function () {
    const weatherData = await getWeather($('#city-input').val())
    render(weatherData)
  })
})
