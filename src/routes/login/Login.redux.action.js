import { POST_AUTH } from "./Login.redux.actionTypes";

export const postAuth = (res,err) => ({
    type: POST_AUTH,
    payload: res,
    error: err  
})