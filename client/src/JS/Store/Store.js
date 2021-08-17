import { applyMiddleware, compose, createStore } from "redux";
import {rootReducer} from '../Reducers/Index';
import thunk  from 'redux-thunk'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
  ));