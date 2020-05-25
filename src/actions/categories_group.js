import {
    GET_CATEGORIES_GROUPS_REQUEST,
    GET_CATEGORIES_GROUPS_SUCCESS,
    GET_CATEGORIES_GROUPS_FAILED,
} from "../actionTypes";
import axios from "../utils/axios";

export const getCategoriesGroupsRequest = () => ({
    type: GET_CATEGORIES_GROUPS_REQUEST
})

export const getCategoriesGroupsFailed = err => ({
    type: GET_CATEGORIES_GROUPS_FAILED, err
})

export const getCategoriesGroupsSuccess = payload => ({
    type: GET_CATEGORIES_GROUPS_SUCCESS, payload
})

export const getCategoriesGroups = () => {
    return dispatch => {
        dispatch(getCategoriesGroupsRequest())
        return axios.get("/categories_groups")
            .then(({ data }) => {
                dispatch(getCategoriesGroupsSuccess(data.data));
            }).catch(err => dispatch(getCategoriesGroupsFailed(err)));
    };
}
