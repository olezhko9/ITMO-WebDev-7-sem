import getWeather from "./weather";
const weatherTemplate = require('../components/weather.pug')

export async function onFormSubmit (event) {
  event.preventDefault()
  $('#search-btn').addClass('loading')

  const city = $(this).serializeArray()[0].value
  const weatherData = await getWeather(city)
  $('#city-input').val('')

  const weatherComponent = weatherTemplate({
    weather: weatherData
  })

  $('.weather-main').prepend(weatherComponent)
  $('#search-btn').removeClass('loading')
}


export function onCloseButtonClick () {
  $(this).parent().remove()
}
