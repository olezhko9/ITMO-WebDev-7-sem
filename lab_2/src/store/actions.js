import {fetchWeather} from "../services/weather";

export const addCity = (city) => async dispatch => {
  dispatch({
    type: "ADD_CITY_LOADING",
    payload: {
      name: city,
      isLoading: true
    }
  });

  let weather = null;
  try {
    weather = await fetchWeather(city);

    if (weather.cod != 200) {
      dispatch({
        type: "ADD_CITY_ERROR",
        payload: {
          name: city,
          error: true
        }
      });
    }
    else {
      dispatch({
        type: "ADD_CITY_SUCCESS",
        payload: weather
      });
    }

  } catch (e) {
    dispatch({
      type: "ADD_CITY_ERROR",
      payload: {
        name: city,
        error: true
      }
    });
  }
}

export const removeCity = city => ({
  type: "REMOVE_CITY",
  payload: city
});
