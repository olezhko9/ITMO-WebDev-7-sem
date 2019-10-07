const reducer = (state = [], action) => {
  if (action.type === "ADD_CITY") {
    return [
      ...state,
      action.payload
    ];
  }
  else if (action.type === "REMOVE_CITY") {
    return state.filter(city => city !== action.payload)
  }
  return state;
}

export default reducer;
