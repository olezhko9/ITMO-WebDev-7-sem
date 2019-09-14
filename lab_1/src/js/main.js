import getWeather from './weather'

$(function () {
  $('#search-btn').click(async function () {
    await getWeather($('#city-input').val())
  })
})
