import { 
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILED,  
} from "../actionTypes";
import axios from "../utils/axios";

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
