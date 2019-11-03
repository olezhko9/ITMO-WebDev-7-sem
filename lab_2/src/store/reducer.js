import { combineReducers } from 'redux';
import favorites from './reducers/favorites';
import main from './reducers/main';


export default combineReducers({
  favorites,
  main
})
