async function getWeather(city) {
  const access = '9b996e3e51a4e3dbd955853e9ba2c792'
  try {
    let weather = await fetch(
      `http://api.weatherstack.com/current?access_key=${access}&query=${city}`,
      {"method": "GET"}
    )
    weather = await weather.json()

    console.log(weather);
  } catch (e) {
    console.log(e);
  }
}

export default getWeather
