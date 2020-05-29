import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import logger from 'redux-logger';

import appReducer from "./reducers/app";
import authReducer from "./reducers/auth";
import skillsReducer from "./reducers/skills";
import languagesReducer from "./reducers/languages";
import citiesReducer from "./reducers/cities";
import tasksReducer from "./reducers/tasks";
import categoriesGroupsReducer from "./reducers/categories_groups";
import categoriesReducer from "./reducers/categories";

const reduceReducers = (...reducers) => {
  return (previous, current) =>
    reducers.reduce(
      (p, r) => r(p, current),
      previous
    );
}

export default createStore(
    combineReducers({ 
      app: appReducer,
      auth: authReducer, 
      skills: skillsReducer,
      languages: languagesReducer,
      cities: citiesReducer,
      tasks: tasksReducer,
      categoriesGroups: categoriesGroupsReducer,
      categories: categoriesReducer
    }),
    applyMiddleware(thunk, logger)
)