import {
    GET_LANGUAGES_REQUEST,
    GET_LANGUAGES_SUCCESS,
    GET_LANGUAGES_FAILED,
} from "../actionTypes";
import axios from "../utils/axios";

export const getLanguagesRequest = () => ({
    type: GET_LANGUAGES_REQUEST
})

export const getLanguagesFailed = err => ({
    type: GET_LANGUAGES_FAILED, err
})

export const getLanguagesSuccess = payload => ({
    type: GET_LANGUAGES_SUCCESS, payload
})

export const getLanguages = () => {
    return dispatch => {
        dispatch(getLanguagesRequest())
        return axios.get("/languages")
            .then(({ data }) => {
                dispatch(getLanguagesSuccess(data.data));
            }).catch(err => dispatch(getLanguagesFailed(err)));
    };
}
