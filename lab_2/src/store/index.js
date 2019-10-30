import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk'
import {composeWithDevTools} from "redux-devtools-extension";

import reducer from "./reducer";

const STORAGE_KEY = 'favorite-cities-weather'
const preloadedState = {
  favorites: localStorage[STORAGE_KEY] ? JSON.parse(localStorage[STORAGE_KEY]) : []
}

const store = createStore(
  reducer,
  preloadedState,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  localStorage[STORAGE_KEY] = JSON.stringify(store.getState().favorites.map(favorite => favorite.name))
})

export default store;
