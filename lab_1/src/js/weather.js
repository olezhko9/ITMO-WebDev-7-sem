async function getWeather(city) {
  const access = '9b996e3e51a4e3dbd955853e9ba2c792'
  let data = null
  try {
    data = await fetch(
      `http://api.weatherstack.com/current?access_key=${access}&query=${city}`,
      { "method": "GET" }
    )
    data = await data.json()
  } catch (e) {
    data = e.response.data
  }
  return data
}

export default getWeather
