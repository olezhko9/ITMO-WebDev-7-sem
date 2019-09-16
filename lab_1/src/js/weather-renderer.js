function render(data) {
  if(data.success && data.success === false) {
    renderErrorMessage(data.error.info)
  } else {
    renderWeather(data)
  }
}

function renderWeather(weather) {
  if (weather.current) {
    for (let key in weather.current) {
      const weatherElement = $('<p></p>').text(key + ': ' + weather.current[key])
      $('body').append(weatherElement)
    }
  }
}

function renderErrorMessage(errorMsg) {
  const errorElement = $('<p></p>').text(errorMsg)
  $('body').append(errorElement)
}

export default render
