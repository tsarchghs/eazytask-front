import { 
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILED,  
    PATCH_USER_REQUEST,
    PATCH_USER_FAILED,
    PATCH_USER_SUCCESS
} from "../actionTypes";
import { updateAuthProfile } from "./auth"; 
import axios from "../utils/axios";
import { objectToFormData } from 'object-to-formdata';

export const postUserRequest = () => ({
    type: POST_USER_REQUEST
})

export const postUserFailed = err => ({
    type: POST_USER_FAILED, err
})

export const postUserSuccess = payload => ({
    type: POST_USER_SUCCESS, payload
})

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

export const patchUser = ({userId, data,callUpdateAuthProfile}) => {
    return dispatch => {
        dispatch(patchUserRequest())
        return axios.patch("/users/" + userId, objectToFormData(data))
            .then(({ data }) => {
                dispatch(patchUserSuccess(userId,data));
                if (callUpdateAuthProfile) dispatch(updateAuthProfile(data.data));
            }).catch(err => dispatch(patchUserFailed(userId,err)));
    };
}