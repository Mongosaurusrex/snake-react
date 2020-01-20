import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/index';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.dygant.com/snake',
  headers: {
    'Content-Type': 'application/json', 
  },
});

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk.withExtraArgument(api)),
  );
}
