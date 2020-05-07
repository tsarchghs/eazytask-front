import { createStore, combineReducers, applyMiddleware } from "redux"
import { authReducer } from "../components/auth/Auth.redux.reducer";
import thunk from "redux-thunk";
import logger from 'redux-logger';

export default createStore(
    combineReducers({ auth: authReducer }),
    applyMiddleware(thunk, logger)
)