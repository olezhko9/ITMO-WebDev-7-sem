import {fetchWeather} from "../services/weather";

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
