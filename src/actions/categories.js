import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_SUCCESS,
    GET_CATEGORIES_FAILED,
} from "../actionTypes";
import axios from "../utils/axios";

export const getCategoriesRequest = () => ({
    type: GET_CATEGORIES_REQUEST
})

export const getCategoriesFailed = err => ({
    type: GET_CATEGORIES_FAILED, err
})

export const getCategoriesSuccess = payload => ({
    type: GET_CATEGORIES_SUCCESS, payload
})

export const getCategories = (categoryGroupId) => {
    return dispatch => {
        dispatch(getCategoriesRequest())
        let path = "/categories";
        let query = categoryGroupId ? "?categoryGroupId=" + categoryGroupId : ""
        return axios.get(path + query)
            .then(({ data }) => {
                dispatch(getCategoriesSuccess(data.data));
            }).catch(err => dispatch(getCategoriesFailed(err)));
    };
}
