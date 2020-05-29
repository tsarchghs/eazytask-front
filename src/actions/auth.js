import {
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_AUTH_FAILED, 
    POST_AUTH_REQUEST,
    POST_AUTH_SUCCESS,
    POST_AUTH_FAILED, 
    UPDATE_AUTH_PROFILE,
    UPDATE_AUTH_PROFILE_TASKER, 
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
        return axios.get("/auth")
            .then(({ data }) => {
                dispatch(getAuthSuccess(data));
            }).catch(err => dispatch(getAuthFailed(err)));
    };
}


export const postAuth = ({ email, password }) => {
    return dispatch => {
        dispatch(postAuthRequest())
        return axios.post("/auth", {
            email, password
        })
            .then(({ data }) => {
                dispatch(postAuthSuccess(data));
            }).catch(err => dispatch(postAuthFailed(err)));
    };
}

export const updateAuthProfile = data => ({ 
    type: UPDATE_AUTH_PROFILE,
    data 
})

export const updateAuthProfileTasker = data => ({
    type: UPDATE_AUTH_PROFILE_TASKER,
    data
})

export const logout = () => ({ type: LOGOUT })
