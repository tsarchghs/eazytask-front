import { POST_USER } from "./Register.redux.actionTypes";

export const postUser = (res,err) => ({
    type: POST_USER,
    payload: res,
    error: err  
})