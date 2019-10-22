
function fetchWeather(location) {
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=263bacc60191ddc5e17b82d2d0c753d4`
  return fetch(url)
    .then(res => res.json())
    .catch(e => console.log)
}

export const addCity = (city) => async dispatch => {
  const weather = await fetchWeather(city);

  dispatch({
    type: "ADD_CITY",
    payload: weather
  });
}

export const removeCity = city => ({
  type: "REMOVE_CITY",
  payload: city
});
