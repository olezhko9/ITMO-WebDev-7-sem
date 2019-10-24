const reducer = (state = [], action) => {

  if (action.type === "ADD_CITY_SUCCESS") {
    return state.map((city, index) => {
      if (city.name.toLowerCase() === action.payload.name.toLowerCase())
        return action.payload

      return city
    })
  }

  else if (action.type === "ADD_CITY_ERROR" ) {

    console.log(action.payload);
    return state.map((city, index) => {
      if (city.name.toLowerCase() === action.payload.name.toLowerCase())
        return action.payload

      return city
    })
  }

  else if (action.type === "ADD_CITY_LOADING") {
    return [
      ...state,
      action.payload
    ];
  }

  else if (action.type === "REMOVE_CITY") {
    return state.filter(city => city.name !== action.payload)
  }

  return state;
}

export default reducer;
