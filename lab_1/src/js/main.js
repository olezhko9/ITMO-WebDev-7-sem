import getWeather from './weather'
// import render from './weather-renderer'

$(function () {
  $('#search-btn').click(async function () {
    const weatherData = await getWeather($('#city-input').val())
    const html = renderWeather({ name: weatherData.location.name })
    const div = document.createElement("div");
    div.innerHTML = html;
    document.body.appendChild(div);
    // render(weatherData)
  })
})
