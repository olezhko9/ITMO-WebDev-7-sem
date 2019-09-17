import getWeather from './weather'
import renderWeather from '../components/weather'

$(function () {
  $('#search-btn').click(async function () {
    const weatherData = await getWeather($('#city-input').val())
    const html = renderWeather({ name: weatherData.location.name })
    const div = document.createElement("div");
    div.innerHTML = html;
    document.body.appendChild(div);
  })
})
