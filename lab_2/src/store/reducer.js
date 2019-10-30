import {ADD_CITY, FETCH_CITY_LOADING, FETCH_CITY_ERROR, FETCH_CITY_SUCCESS, REMOVE_CITY} from "./actionTypes"


const reducer = (state = [], action) => {

  switch (action.type) {
    case ADD_CITY:
      return {
        favorites: [
          ...state.favorites,
          action.payload
        ]
      };

    case FETCH_CITY_LOADING:
    case FETCH_CITY_SUCCESS:
    case FETCH_CITY_ERROR:
      return {
        favorites: state.favorites.map((city, index) => {
          if (city.name.toLowerCase() === action.payload.name.toLowerCase())
            return action.payload

          return city
        })
      };

    case REMOVE_CITY:
      return {
        favorites: state.favorites.filter(city => city.name !== action.payload)
      };

    default:
      return state
  }
}

export default reducer;
