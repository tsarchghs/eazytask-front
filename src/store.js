import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk";
import logger from 'redux-logger';

import appReducer from "./reducers/app";
import authReducer from "./reducers/auth";
import usersReducer from "./reducers/user";
import skillsReducer from "./reducers/skills";
import offersReducer from "./reducers/offers";
import languagesReducer from "./reducers/languages";
import citiesReducer from "./reducers/cities";
import tasksReducer from "./reducers/tasks";
import categoriesGroupsReducer from "./reducers/categories_groups";
import categoriesReducer from "./reducers/categories";
import messagesReducer from "./reducers/messages";

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
      users: usersReducer, 
      skills: skillsReducer,
      offers: offersReducer,
      languages: languagesReducer,
      cities: citiesReducer,
      tasks: tasksReducer,
      categoriesGroups: categoriesGroupsReducer,
      categories: categoriesReducer,
      messages: messagesReducer
    }),
    applyMiddleware(thunk, logger)
)