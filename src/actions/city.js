import {
    GET_CITIES_REQUEST,
    GET_CITIES_SUCCESS,
    GET_CITIES_FAILED,
} from "../actionTypes";
import axios from "../utils/axios";

export const getCitiesRequest = () => ({
    type: GET_CITIES_REQUEST
})

export const getCitiesFailed = err => ({
    type: GET_CITIES_FAILED, err
})

export const getCitiesSuccess = payload => ({
    type: GET_CITIES_SUCCESS, payload
})

export const getCities = () => {
    return dispatch => {
        dispatch(getCitiesRequest())
        return axios.get("/cities")
            .then(({ data }) => {
                dispatch(getCitiesSuccess(data.data));
            }).catch(err => dispatch(getCitiesFailed(err)));
    };
}
