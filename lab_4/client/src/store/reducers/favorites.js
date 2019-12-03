import {FETCH_CITY_LOADING, FETCH_CITY_ERROR, FETCH_CITY_SUCCESS, REMOVE_FAVORITE, FETCH_FAVORITES, ADD_FAVORITE} from "../actionTypes"


const reducer = (state = [], action) => {

  if (action.payload && !action.payload.isFavorite) {
    switch (action.type) {
      case FETCH_FAVORITES:
        return action.payload

      case ADD_FAVORITE:
        return [
          ...state,
          action.payload
        ]
    }
  }
  else {
    switch (action.type) {
      case FETCH_CITY_LOADING:
      case FETCH_CITY_SUCCESS:
      case FETCH_CITY_ERROR:
        return state.map((city) => {
          if (city.cityName.toLowerCase() === action.payload.cityName.toLowerCase())
            return action.payload

          return city
        })

      case REMOVE_FAVORITE:
        return state.filter(city => city.cityName !== action.payload.cityName)
    }
  }
  return state
}

export default reducer;
