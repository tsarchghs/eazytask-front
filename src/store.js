import { createStore, combineReducers, applyMiddleware } from "redux"
import authReducer from "./reducers/auth";
import skillsReducer from "./reducers/skills";
import languagesReducer from "./reducers/languages";
import citiesReducer from "./reducers/cities";
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
    combineReducers({ 
      auth: authReducer, 
      skills: skillsReducer,
      languages: languagesReducer,
      cities: citiesReducer
    }),
    applyMiddleware(thunk, logger)
)