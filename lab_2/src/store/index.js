import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";

import reducer from "./reducer";

const STORAGE_KEY = 'weather-cities'
const preloadedState = localStorage[STORAGE_KEY] ? JSON.parse(localStorage[STORAGE_KEY]) : []

const store = createStore(
  reducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  localStorage[STORAGE_KEY] = JSON.stringify(store.getState())
})

export default store;
