import {
    GET_TASKS,
    GET_TASKS_REQUEST,
    GET_TASKS_FAILED,
    GET_TASKS_SUCCESS,
    GET_TASK,
    GET_TASK_REQUEST,
    GET_TASK_FAILED,
    GET_TASK_SUCCESS,
} from "../actionTypes";
import axios from "../utils/axios";

export const getTaskRequest = id => ({
    type: GET_TASK_REQUEST,id
})

export const getTaskFailed = (err,id) => ({
    type: GET_TASK_FAILED, err, id
})

export const getTaskSuccess = (payload,id) => ({
    type: GET_TASK_SUCCESS, payload,id
})

export const getTask = (id) => {
    return dispatch => {
        dispatch(getTaskRequest(id))
        return axios.get("/tasks/" + id)
            .then(({ data }) => {
                dispatch(getTaskSuccess(data.data,id));
            }).catch(err => dispatch(getTaskFailed(err,id)));
    };
}
