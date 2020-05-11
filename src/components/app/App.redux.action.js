import { GET_AUTH } from "./App.redux.actionTypes";

export const getAuth = (res, err) => ({
    type: GET_AUTH,
    payload: res,
    error: err
})