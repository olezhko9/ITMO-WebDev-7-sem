import {ADD_CITY, FETCH_CITY_LOADING, FETCH_CITY_ERROR, FETCH_CITY_SUCCESS, REMOVE_CITY} from "./actionTypes"


const reducer = (state = [], action) => {

  if (action.type === ADD_CITY) {
    return {
      favorites: [
        ...state.favorites,
        action.payload
      ]
    };
  }

  else if (action.type === FETCH_CITY_SUCCESS) {
    return {
      favorites: state.favorites.map((city, index) => {
        if (city.name.toLowerCase() === action.payload.name.toLowerCase())
          return action.payload

        return city
      })
    }
  }

  else if (action.type === FETCH_CITY_ERROR) {
    return {
      favorites: state.favorites.map((city, index) => {
        if (city.name.toLowerCase() === action.payload.name.toLowerCase())
          return action.payload

        return city
      })
    }
  }

  else if (action.type === FETCH_CITY_LOADING) {
    return {
      favorites: state.favorites.map((city, index) => {
        if (city.name.toLowerCase() === action.payload.name.toLowerCase())
          return action.payload

        return city
      })
    }
  }

  else if (action.type === REMOVE_CITY) {
    return {
      favorites: state.favorites.filter(city => city.name !== action.payload)
    }
  }

  return state;
}

export default reducer;
