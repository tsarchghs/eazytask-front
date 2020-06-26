import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_FAILED,
    GET_MESSAGES_SUCCESS,
    POST_MESSAGES_REQUEST,
    POST_MESSAGES_FAILED,
    POST_MESSAGES_SUCCESS
} from "../actionTypes";
import axios from "../utils/axios";

export const getMessagesRequest = taskId => ({
    type: GET_MESSAGES_REQUEST, taskId
})

export const getMessagesFailed = (taskId, err) => ({
    type: GET_MESSAGES_FAILED, taskId, err
})

export const getMessagesSuccess = (taskId, payload) => ({
    type: GET_MESSAGES_SUCCESS, taskId, payload
})
export const getMessages = ({ taskId }) => {
    return dispatch => {
        dispatch(getMessagesRequest(taskId))
        return axios.get(`/messages?taskId=${taskId}`)
            .then(({ data }) => {
                dispatch(getMessagesSuccess(taskId,data.data));
            }).catch(err => {
                dispatch(getMessagesFailed(taskId,err))
            });
    };
}

export const postMessagesRequest = taskId => ({
    type: POST_MESSAGES_REQUEST, taskId
})

export const postMessagesFailed = (taskId, err) => ({
    type: POST_MESSAGES_FAILED, taskId, err
})

export const postMessagesSuccess = (taskId, payload) => ({
    type: POST_MESSAGES_SUCCESS, taskId, payload
})

export const postMessages = ({ taskId, content, client_createdAt }) => {
    return dispatch => {
        dispatch(postMessagesRequest(taskId))
        return axios.post(`/messages`, {
            taskId, content, client_createdAt
        })
            .then(({ data }) => {
                dispatch(postMessagesSuccess(taskId, data.data));
            }).catch(err => {
                dispatch(postMessagesFailed(taskId, err))
            });
    };
}