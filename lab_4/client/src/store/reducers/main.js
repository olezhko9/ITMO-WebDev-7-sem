import {FETCH_CITY_LOADING, FETCH_CITY_ERROR, FETCH_CITY_SUCCESS} from "../actionTypes"


const reducer = (state = {}, action) => {

  if (action.payload && action.payload.isFavorite) {
    return state;
  }

  switch (action.type) {

    case FETCH_CITY_LOADING:
      return action.payload

    case FETCH_CITY_SUCCESS:
    case FETCH_CITY_ERROR:
      return action.payload

    default:
      return state
  }
}

export default reducer;
