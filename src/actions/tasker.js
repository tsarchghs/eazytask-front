import {
    POST_TASKER_REQUEST,
    POST_TASKER_FAILED,
    POST_TASKER_SUCCESS,
} from "../actionTypes";
import axios from "../utils/axios";
import { updateAuthProfileTasker } from "./auth";

export const postTaskerRequest = () => ({
    type: POST_TASKER_REQUEST, 
})

export const postTaskerFailed = err => ({
    type: POST_TASKER_FAILED, err, 
})

export const postTaskerSuccess = payload => ({
    type: POST_TASKER_SUCCESS, payload, 
})

export const postTasker = data => {
    return dispatch => {
        dispatch(postTaskerRequest())
        let token = localStorage.getItem("eazytask:token");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        return axios.post("/taskers", data, config)
            .then(({ data }) => {
                dispatch(postTaskerSuccess(data.data));
                dispatch(updateAuthProfileTasker(data.data))
            }).catch(err => dispatch(postTaskerFailed(err)));
    };
}
