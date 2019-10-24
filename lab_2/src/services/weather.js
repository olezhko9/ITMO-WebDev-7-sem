export function fetchWeather(location) {
  let url = ''

  if (Array.isArray(location)) {
    url = `http://api.openweathermap.org/data/2.5/weather?lat=${location[0]}&lon=${location[1]}&appid=263bacc60191ddc5e17b82d2d0c753d4`
  } else if (typeof location === 'string' && location.length) {
    url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=263bacc60191ddc5e17b82d2d0c753d4`
  } else return

  return fetch(url).then(res => res.json())
}
