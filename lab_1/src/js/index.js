import getWeather from './weather'
import '../style/main.sass'

const weatherTemplate = require('../components/weather.pug')

$(function () {
  $('#search-btn').click(async function () {
    $('#search-btn').addClass('loading')
    const weatherData = await getWeather($('#city-input').val())

    const weatherComponent = weatherTemplate({
      weather: weatherData
    })

    $('.weather-main').prepend(weatherComponent)
    $('#search-btn').removeClass('loading')
  })

  $(document).on('click', '.close', function (e) {
    $(this).parent().remove()
  })
})
