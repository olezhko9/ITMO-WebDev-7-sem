export const addCity = city => ({
  type: "ADD_CITY",
  payload: city
});

export const removeCity = city => ({
  type: "REMOVE_CITY",
  payload: city
});

export const getCitiesWeather = () => dispatch => {
  setTimeout(() => {
    console.log('THUNK')
    dispatch({type: 'FETCH_CITIES_WEATHER', payload: ['Moscow', 'Kstovo']})
  }, 2000)
}
