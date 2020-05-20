import { createStore, combineReducers, applyMiddleware } from "redux"
import { authReducer } from "./reducers/auth";
import thunk from "redux-thunk";
import logger from 'redux-logger';

const reduceReducers = (...reducers) => {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}

export default createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk, logger)
)