import {
    SET_CREATE_TASK,
    GET_MY_ACTIVE_TASKS_REQUEST,
    GET_MY_ACTIVE_TASKS_FAILED,
    GET_MY_ACTIVE_TASKS_SUCCESS,
    GET_MY_ACTIVE_OFFERS_REQUEST,
    GET_MY_ACTIVE_OFFERS_FAILED,
    GET_MY_ACTIVE_OFFERS_SUCCESS,
    GET_ACTIVE_LISTING_REQUEST,
    GET_ACTIVE_LISTING_FAILED,
    GET_ACTIVE_LISTING_SUCCESS,
    GET_ACTIVE_LISTING2_REQUEST,
    GET_ACTIVE_LISTING2_FAILED,
    GET_ACTIVE_LISTING2_SUCCESS,
    GET_ACTIVE_LISTING3_REQUEST,
    GET_ACTIVE_LISTING3_FAILED,
    GET_ACTIVE_LISTING3_SUCCESS,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_FAILED,
    UPDATE_TASK_SUCCESS,
    SEND_VERIFICATION_CODE_REQUEST,
    SEND_VERIFICATION_CODE_FAILED,
    SEND_VERIFICATION_CODE_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    VALIDATE_VERIFICATION_CODE_REQUEST,
    VALIDATE_VERIFICATION_CODE_FAILED,
    VALIDATE_VERIFICATION_CODE_SUCCESS
} from "../actionTypes";
import { getTasks, patchTasks } from "./task";
import { getOffers } from "./offer";
import jwt_decode from "jwt-decode";
import axios from "../utils/axios";

export const setCreateTask = createTask => ({
    type: SET_CREATE_TASK, createTask
})

export const getMyActiveTasksRequest = () => ({
    type: GET_MY_ACTIVE_TASKS_REQUEST
})

export const getMyActiveTasksFailed = err => ({
    type: GET_MY_ACTIVE_TASKS_FAILED, err
})

export const getMyActiveTasksSuccess = ids => ({
    type: GET_MY_ACTIVE_TASKS_SUCCESS, ids
})

export const getMyActiveOffersRequest = () => ({
    type: GET_MY_ACTIVE_OFFERS_REQUEST
})

export const getMyActiveOffersFailed = err => ({
    type: GET_MY_ACTIVE_OFFERS_FAILED, err
})

export const getMyActiveOffersSuccess = ids => ({
    type: GET_MY_ACTIVE_OFFERS_SUCCESS, ids
})

export const getActiveListingRequest = () => ({
    type: GET_ACTIVE_LISTING_REQUEST
})

export const getActiveListingFailed = err => ({
    type: GET_ACTIVE_LISTING_FAILED, err
})

export const getActiveListingSuccess = ids => ({
    type: GET_ACTIVE_LISTING_SUCCESS, ids
})

export const getActiveListing2Request = () => ({
    type: GET_ACTIVE_LISTING2_REQUEST
})

export const getActiveListing2Failed = err => ({
    type: GET_ACTIVE_LISTING2_FAILED, err
})

export const getActiveListing2Success = ids => ({
    type: GET_ACTIVE_LISTING2_SUCCESS, ids
})

export const getActiveListing3Request = () => ({
    type: GET_ACTIVE_LISTING3_REQUEST
})

export const getActiveListing3Failed = err => ({
    type: GET_ACTIVE_LISTING3_FAILED, err
})

export const getActiveListing3Success = ids => ({
    type: GET_ACTIVE_LISTING3_SUCCESS, ids
})

export const updateTaskRequest = () => ({
    type: UPDATE_TASK_REQUEST
})

export const updateTaskFailed = err => ({
    type: UPDATE_TASK_FAILED, err
})

export const updateTaskSuccess = () => ({
    type: UPDATE_TASK_SUCCESS
})

export const getMyActiveTasks = ({ limit, offset } = {}) => {
    return dispatch => {
        let { userId } = jwt_decode(localStorage.getItem("eazytask:token"));
        let configs = {
            onRequest: getMyActiveTasksRequest(),
            onFailed: err => getMyActiveTasksFailed(err),
            onSuccess: tasks => getMyActiveTasksSuccess(tasks.map(x => x.id)),
            filters: { fields: "category,user", limit: limit || 6, offset: offset || 0 },
            UserId: userId
        }
        dispatch(getTasks(configs))
    }
}

export const getMyActiveOffers = () => {
    return dispatch => {
        let { userId } = jwt_decode(localStorage.getItem("eazytask:token"));
        let configs = {
            onRequest: getMyActiveOffersRequest(),
            onFailed: err => getMyActiveOffersFailed(err),
            onSuccess: offers => getMyActiveOffersSuccess(offers.map(x => x.id)),
            filters: { fields: "category,user", },
            UserId: userId
        }
        dispatch(getOffers(configs))
    }
}

export const getActiveListing = () => {
    return dispatch => {
        let configs = {
            onRequest: getActiveListingRequest(),
            onFailed: err => getActiveListingFailed(err),
            onSuccess: tasks => getActiveListingSuccess(tasks.map(x => x.id)),
            filters: { limit: 6, fields: "category,user" }
        }
        dispatch(getTasks(configs))
    }
}

export const getActiveListing2 = ({
    limit, offset, category_id, city, due_date, expire_soon, title,
    min_expected_price, max_expected_price
}) => {
    return dispatch => {
        let configs = {
            onRequest: getActiveListing2Request(),
            onFailed: err => getActiveListing2Failed(err),
            onSuccess: tasks => getActiveListing2Success(tasks.map(x => x.id)),
            filters: {
                fields: "category,user", limit, offset, category_id, city: city || undefined,
                due_date, expire_soon, title: title || undefined,
                min_expected_price, max_expected_price
            }
        }
        dispatch(getTasks(configs))
    }
}

export const getActiveListing3 = ({
    limit, offset, category_id, city, due_date, expire_soon, title,
    min_expected_price, max_expected_price
}) => {
    return dispatch => {
        let configs = {
            onRequest: getActiveListing3Request(),
            onFailed: err => getActiveListing3Failed(err),
            onSuccess: tasks => getActiveListing3Success(tasks.map(x => x.id)),
            filters: {
                fields: "category,user", limit, offset, category_id, city: city || undefined,
                due_date, expire_soon, title: title || undefined,
                min_expected_price, max_expected_price
            }
        }
        dispatch(getTasks(configs))
    }
}


export const updateTask = ({ id, data }) => {
    return dispatch => {
        let configs = {
            onRequest: updateTaskRequest(),
            onFailed: updateTaskFailed,
            onSuccess: updateTaskSuccess,
            id, data
        }
        dispatch(patchTasks(configs))
    }
}

// export const sendVerificationCodeRequest = () => ({
//     type: SEND_VERIFICATION_CODE_REQUEST
// })

// export const sendVerificationCodeFailed = err => ({
//     type: SEND_VERIFICATION_CODE_FAILED, err
// })

// export const sendVerificationCodeSuccess = () => ({
//     type: SEND_VERIFICATION_CODE_SUCCESS
// })

export const sendVerificationCode = email => dispatch => axios.post("/users/send_verification_code", { email })

export const resetPassowrdRequest = () => ({
    type: RESET_PASSWORD_REQUEST
})

export const resetPassowrdFailed = err => ({
    type: RESET_PASSWORD_FAILED, err
})

export const resetPassowrdSuccess = () => ({
    type: RESET_PASSWORD_SUCCESS
})

export const resetPassword = ({ email, new_password, confirm_new_password, code }) => {
    return dispatch => {
        dispatch(resetPassowrdRequest())
        let body = { email, new_password, confirm_new_password, code };
        return axios.post("/users/reset_password", body)
            .then(() => dispatch(resetPassowrdSuccess()))
            .catch(err => dispatch(resetPassowrdFailed(err)));
    }
}

export const validateVerificationCodeRequest = () => ({
    type: VALIDATE_VERIFICATION_CODE_REQUEST
})

export const validateVerificationCodeFailed = err => ({
    type: VALIDATE_VERIFICATION_CODE_FAILED, err
})

export const validateVerificationCodeSuccess = () => ({
    type: VALIDATE_VERIFICATION_CODE_SUCCESS
})

export const validateVerificationCode = ({ email, code }) => {
    return dispatch => {
        dispatch(validateVerificationCodeRequest())
        let body = { email, code };
        return axios.post("/users/validate_verification_code", body)
            .then(() => dispatch(validateVerificationCodeSuccess()))
            .catch(err => dispatch(validateVerificationCodeFailed(err)));
    }
}

