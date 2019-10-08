import {createStore} from "redux";
import reducer from "./reducer";

const STORAGE_KEY = 'weather-cities'
const preloadedState = localStorage[STORAGE_KEY] ? JSON.parse(localStorage[STORAGE_KEY]) : []

const store = createStore(
  reducer,
  preloadedState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  localStorage[STORAGE_KEY] = JSON.stringify(store.getState())
})

export default store;
