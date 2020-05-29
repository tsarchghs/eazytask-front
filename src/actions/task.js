import {
    GET_TASKS,
    GET_TASKS_REQUEST,
    GET_TASKS_FAILED,
    GET_TASKS_SUCCESS,
    GET_TASK,
    GET_TASK_REQUEST,
    GET_TASK_FAILED,
    GET_TASK_SUCCESS,
    POST_TASKS_REQUEST,
    POST_TASKS_FAILED,
    POST_TASKS_SUCCESS
} from "../actionTypes";
import axios from "../utils/axios";
import { setCreateTask } from "./app";

export const getTaskRequest = id => ({
    type: GET_TASK_REQUEST, id
})

export const getTaskFailed = (err, id) => ({
    type: GET_TASK_FAILED, err, id
})

export const getTaskSuccess = (payload, id) => ({
    type: GET_TASK_SUCCESS, payload, id
})

export const postTasksRequest = () => ({
    type: POST_TASKS_REQUEST
})

export const postTasksFailed = err => ({
    type: POST_TASKS_FAILED, err
})

export const postTasksSuccess = payload => ({
    type: POST_TASKS_SUCCESS, payload
})

export const getTask = (id) => {
    return dispatch => {
        dispatch(getTaskRequest(id))
        return axios.get("/tasks/" + id + "?fields=offers")
            .then(({ data }) => {
                dispatch(getTaskSuccess(data.data, id));
            }).catch(err => dispatch(getTaskFailed(err,id)));
    };
}

export const postTasks = (body,fromCreateTask) => {
    return dispatch => {
        dispatch(postTasksRequest())
        return axios.post("/tasks", body)
            .then(({ data }) => {
                dispatch(postTasksSuccess(data.data));
                if (fromCreateTask) dispatch(setCreateTask({ loading: false, data: data.data }))
            }).catch(err => dispatch(postTasksFailed(err)));
    };
}
