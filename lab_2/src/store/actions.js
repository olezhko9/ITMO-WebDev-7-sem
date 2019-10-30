import {fetchWeather} from "../services/weather";
import {ADD_CITY, FETCH_CITY_LOADING, FETCH_CITY_ERROR, FETCH_CITY_SUCCESS, REMOVE_CITY} from "./actionTypes"


export const addCity = city => ({
  type: ADD_CITY,
  payload: {
    name: city
  }
})

export const fetchCity = (city) => async dispatch => {
  dispatch({
    type: FETCH_CITY_LOADING,
    payload: {
      name: city,
      isLoading: true
    }
  });

  let weather = null;
  try {
    weather = await fetchWeather(city);

    if (weather.cod != 200) {
      throw new Error("City not found")
    }
    else {
      dispatch({
        type: FETCH_CITY_SUCCESS,
        payload: weather
      });
    }

  } catch (e) {
    dispatch({
      type: FETCH_CITY_ERROR,
      payload: {
        name: city,
        ...weather
      }
    });
  }
}

export const removeCity = city => ({
  type: REMOVE_CITY,
  payload: city
});
