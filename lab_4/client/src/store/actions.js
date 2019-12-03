import {addToFavorites, fetchWeather, getFavorites, removeFromFavorites} from "../services/weather";
import {FETCH_CITY_LOADING, FETCH_CITY_ERROR, FETCH_CITY_SUCCESS, REMOVE_FAVORITE, FETCH_FAVORITES, ADD_FAVORITE} from "./actionTypes"


export const fetchCity = (city, isFavorite) => async dispatch => {
  dispatch({
    type: FETCH_CITY_LOADING,
    payload: {
      isFavorite,
      cityName: city,
      isLoading: true
    }
  });

  let weather = null;
  try {
    weather = (await fetchWeather(city)).data;
    if (weather.cod == 200) {
      dispatch({
        type: FETCH_CITY_SUCCESS,
        payload: {
          isFavorite,
          cityName: city,
          ...weather
        }
      });
    }
  } catch (e) {
    weather = e.response.data;
    dispatch({
      type: FETCH_CITY_ERROR,
      payload: {
        isFavorite,
        cityName: city,
        ...weather
      }
    });
  }
}

export const addCity = (city) => async dispatch => {
  await addToFavorites(city)
  dispatch({
    type: ADD_FAVORITE,
    payload: {
      cityName: city
    }
  });
}

export const fetchFavorites = () => async dispatch => {
  const favorites = (await getFavorites()).data.map(x => {
    return {cityName: x.name}
  });
  console.log(favorites);
  dispatch({
    type: FETCH_FAVORITES,
    payload: favorites
  });
}

export const removeCity = (city, isFavorite) => async dispatch => {
  dispatch({
    type: REMOVE_FAVORITE,
    payload: {
      isFavorite,
      cityName: city
    }
  })
  await removeFromFavorites(city)
};
