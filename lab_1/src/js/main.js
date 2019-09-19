import getWeather from './weather'

const template = require('../components/weather.pug')

$(function () {
  $('#search-btn').click(async function () {

    const weatherData = await getWeather($('#city-input').val())

    const html = template({
        city: weatherData.location.name,
        weather: weatherData.current
    })

    const div = $('<div></div>').html(html);
    $('.weather-main').append(div)
  })
})
