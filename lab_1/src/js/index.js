import getWeather from './weather'
import '../style/main.sass'
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

  $(document).on('click', '.close', function (e) {
    console.log(e);
    $('.weather-component').remove()
  })
})
