import { 
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILED,  
    PATCH_USER_REQUEST,
    PATCH_USER_FAILED,
    PATCH_USER_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_FAILED,
    GET_USER_SUCCESS
} from "../actionTypes";
import { updateAuthProfile } from "./auth"; 
import axios from "../utils/axios";
import { objectToFormData } from 'object-to-formdata';
import queryString from "query-string";

export const postUserRequest = () => ({
    type: POST_USER_REQUEST
})

export const postUserFailed = err => ({
    type: POST_USER_FAILED, err
})

export const postUserSuccess = payload => ({
    type: POST_USER_SUCCESS, payload
})

export const getUserRequest = id => ({
    type: GET_USER_REQUEST,id
})

export const getUserFailed = (id,err) => ({
    type: GET_USER_FAILED, err,id
})

export const getUserSuccess = (id,payload) => ({
    type: GET_USER_SUCCESS, payload,id
})

export const getUser = (id,options) => {
    return dispatch => {
        dispatch(getUserRequest(id))
        let query = queryString.stringify(options)
        return axios.get(`/users/${id}?` + query)
            .then(({ data }) => {
                dispatch(getUserSuccess(id,data));
            }).catch(err => dispatch(getUserFailed(id,err)));
    };
}

export const postUser = ({ first_name, last_name, email, password }) => {
    return dispatch => {
        dispatch(postUserRequest())
        return axios.post("/users", {
            first_name, last_name, email, password
        })
            .then(({ data }) => {
                dispatch(postUserSuccess(data));
            }).catch(err => dispatch(postUserFailed(err)));
    };
}


export const patchUserRequest = id => ({
    type: PATCH_USER_REQUEST
})

export const patchUserFailed = (id,err) => ({
    type: PATCH_USER_FAILED, err, id 
})

export const patchUserSuccess = (id,payload) => ({
    type: PATCH_USER_SUCCESS, payload, id
})

export const patchUser = ({userId, data,callUpdateAuthProfile, redirectTo, historyPush}) => {
    return dispatch => {
        dispatch(patchUserRequest())
        if (historyPush) historyPush.push("?loading=true")
        return axios.patch("/users/" + userId, objectToFormData(data))
            .then(({ data }) => {
                dispatch(patchUserSuccess(userId,data));
                if (callUpdateAuthProfile) dispatch(updateAuthProfile(data.data));
                if (redirectTo) window.location.href = redirectTo
                if (historyPush) historyPush.push("?success=true")
            }).catch(err => {
                dispatch(patchUserFailed(userId,err))
                if (historyPush) historyPush.push("?error=true")
            });
    };
}