import {
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_AUTH_FAILED, 
    POST_AUTH_REQUEST,
    POST_AUTH_SUCCESS,
    POST_AUTH_FAILED,  
    LOGOUT 
} from "../actionTypes";
import axios from "../utils/axios";

export const getAuthRequest = () => ({
    type: GET_AUTH_REQUEST
})

export const getAuthSuccess = payload => ({
    type: GET_AUTH_SUCCESS, payload
})

export const getAuthFailed = err => ({
    type: GET_AUTH_FAILED, err
})

export const postAuthRequest = () => ({
    type: POST_AUTH_REQUEST
})

export const postAuthSuccess = payload => ({
    type: POST_AUTH_SUCCESS, payload
})

export const postAuthFailed = err => ({
    type: POST_AUTH_FAILED, err
})



export const getAuth = () => {
    return dispatch => {
        dispatch(getAuthRequest())
        let token = localStorage.getItem("eazytask:token");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        console.log({ config })
        return axios.get("/auth", config)
            .then(({ data }) => {
                dispatch(getAuthSuccess(data));
            }).catch(err => dispatch(getAuthFailed(err)));
    };
}


export const postAuth = ({ email, password }) => {
    return dispatch => {
        console.log("POST_AUTH",{email,password})
        dispatch(postAuthRequest())
        return axios.post("/auth", {
            email, password
        })
            .then(({ data }) => {
                dispatch(postAuthSuccess(data));
            }).catch(err => dispatch(postAuthFailed(err)));
    };
}


export const logout = () => ({ type: LOGOUT })
