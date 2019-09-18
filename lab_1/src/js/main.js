import getWeather from './weather'
import renderWeather from '../components/weather'

$(function () {
  $('#search-btn').click(async function () {

    const weatherData = await getWeather($('#city-input').val())
    const html = renderWeather({
      city: weatherData.location.name,
      weather: weatherData.current
    })

    const div = $('<div></div>').html(html);
    $('body').append(div)
  })
})
