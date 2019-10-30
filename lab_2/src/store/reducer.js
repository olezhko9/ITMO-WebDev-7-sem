const reducer = (state = [], action) => {

  if (action.type === "ADD_CITY_SUCCESS") {
    return {
      favorites: state.favorites.map((city, index) => {
        if (city.name.toLowerCase() === action.payload.name.toLowerCase())
          return action.payload

        return city
      })
    }
  }

  else if (action.type === "ADD_CITY_ERROR" ) {
    return {
      favorites: state.favorites.map((city, index) => {
        if (city.name.toLowerCase() === action.payload.name.toLowerCase())
          return action.payload

        return city
      })
    }
  }

  else if (action.type === "ADD_CITY_LOADING") {
    return {
      favorites: [
      ...state.favorites,
      action.payload
    ]};
  }

  else if (action.type === "REMOVE_CITY") {
    return {
      favorites: state.favorites.filter(city => city.name !== action.payload)
    }
  }

  return state;
}

export default reducer;
