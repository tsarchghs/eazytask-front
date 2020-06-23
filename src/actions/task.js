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
    POST_TASKS_SUCCESS,
    GET_TASKS_COUNT_REQUEST,
    GET_TASKS_COUNTS_FAILED,
    GET_TASKS_COUNT_SUCCESS,
    PATCH_TASKS_SUCCESS
} from "../actionTypes";
import axios from "../utils/axios";
import { objectToFormData } from 'object-to-formdata';
import { setCreateTask } from "./app";
import queryString from "query-string";

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

export const getTasksCountRequest = () => ({
    type: GET_TASKS_COUNT_REQUEST
})

export const getTasksCountFailed = err => ({
    type: GET_TASKS_COUNTS_FAILED, err
})

export const getTasksCountSuccess = count => ({
    type: GET_TASKS_COUNT_SUCCESS, count
})

export const getTasksCount = filters => {
    return dispatch => {
        dispatch(getTasksCountRequest())
        let query = queryString.stringify(filters)
        return axios.get("/tasks/count?" + query)
            .then(({ data }) => {
                dispatch(getTasksCountSuccess(data.data.count));
            }).catch(err => dispatch(getTasksCountFailed(err)));
    }
}

export const getTask = (id, query) => {
    id = Number(id);
    return dispatch => {
        dispatch(getTaskRequest(id))
        return axios.get("/tasks/" + id + "?" + query)
            .then(({ data }) => {
                dispatch(getTaskSuccess(data.data, id));
            }).catch(err => dispatch(getTaskFailed(err,id)));
    };
}

export const postTasks = (body,fromCreateTask, query) => {
    var fd = new FormData();
    for (let key of Object.keys(body)){
        if (key == "gallery"){
            for (let x=0;x<body[key].length;x++){
                fd.append("gallery[]",body[key][x]);
            }
        } else {
            fd.append(key,body[key])
        }
    }
    return dispatch => {
        dispatch(postTasksRequest())
        return axios.post("/tasks?" + (query || ""), fd)
            .then(({ data }) => {
                dispatch(postTasksSuccess(data.data));
                if (fromCreateTask) dispatch(setCreateTask({ loading: false, data: data.data }))
            }).catch(err => dispatch(postTasksFailed(err)));
    };
}


export const getTasksRequest = () => ({
    type: GET_TASKS_REQUEST
})

export const getTasksFailed = err => ({
    type: GET_TASKS_FAILED, err
})

export const getTasksSuccess = payload => ({
    type: GET_TASKS_SUCCESS, payload
})

export const getTasks = ({ filters, onRequest, onFailed, onSuccess, UserId} = {}) => {
    return dispatch => {
        dispatch(getTasksRequest())
        if (onRequest) dispatch(onRequest);
        let query = queryString.stringify(filters)
        let byUser = UserId ? "UserId=" + UserId + "&" : ""
        return axios.get("/tasks?" + byUser + query)
            .then(({ data }) => {
                dispatch(getTasksSuccess(data.data));
                if (onSuccess) dispatch(onSuccess(data.data));
            }).catch(err => {
                dispatch(getTasksFailed(err))
                if (onFailed) dispatch(onFailed(err));
            });
    };
}

export const patchTasksSuccess = (id,payload) => ({
    type: PATCH_TASKS_SUCCESS, id, payload
})

export const patchTasks = ({ id, data, onRequest, onFailed, onSuccess } = {}) => {
    return dispatch => {
        // dispatch(patchTasksRequest())
        if (onRequest) dispatch(onRequest);
        return axios.patch("/tasks/" + id, objectToFormData(data))
            .then(({ data }) => {
                dispatch(patchTasksSuccess(id,data.data));
                if (onSuccess) dispatch(onSuccess(data.data));
            }).catch(err => {
                // dispatch(patchTasksFailed(err))
                if (onFailed) dispatch(onFailed(err));
            });
    };
}