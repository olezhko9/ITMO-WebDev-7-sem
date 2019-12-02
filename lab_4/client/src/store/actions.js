import {fetchWeather} from "../services/weather";
import {FETCH_CITY_LOADING, FETCH_CITY_ERROR, FETCH_CITY_SUCCESS, REMOVE_CITY} from "./actionTypes"


export const fetchCity = (city, isFavorite) => async dispatch => {
  dispatch({
    type: FETCH_CITY_LOADING,
    payload: {
      isFavorite,
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
        payload: {
          isFavorite,
          ...weather
        }
      });
    }

  } catch (e) {
    dispatch({
      type: FETCH_CITY_ERROR,
      payload: {
        isFavorite,
        name: city,
        ...weather
      }
    });
  }
}

export const removeCity = (city, isFavorite) => ({
  type: REMOVE_CITY,
  payload: {
    isFavorite,
    name: city
  }
});
