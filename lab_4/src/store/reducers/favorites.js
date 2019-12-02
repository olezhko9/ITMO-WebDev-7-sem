import {FETCH_CITY_LOADING, FETCH_CITY_ERROR, FETCH_CITY_SUCCESS, REMOVE_CITY} from "../actionTypes"


const reducer = (state = [], action) => {

  if (action.payload && !action.payload.isFavorite) {
    return state;
  }

  switch (action.type) {

    case FETCH_CITY_LOADING:
      if (state.find(city => city.name === action.payload.name)) {
        return state;
      }

      return [
        ...state,
        action.payload
      ]

    case FETCH_CITY_SUCCESS:
    case FETCH_CITY_ERROR:
      return state.map((city) => {
        if (city.name.toLowerCase() === action.payload.name.toLowerCase())
          return action.payload

        return city
      })

    case REMOVE_CITY:
      return state.filter(city => city.name !== action.payload.name)

    default:
      return state
  }
}

export default reducer;
