import { 
    SET_CREATE_TASK,
    GET_MY_ACTIVE_TASKS_REQUEST,
    GET_MY_ACTIVE_TASKS_FAILED,
    GET_MY_ACTIVE_TASKS_SUCCESS
} from "../actionTypes";
import { getTasks } from "./task";
import jwt_decode from "jwt-decode";

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

export const getMyActiveTasks = () => {
    return dispatch => {
        let { UserId } = jwt_decode(localStorage.getItem("eazytask:token"));
        let configs = { 
            UserId,
            onRequest: getMyActiveTasksRequest(),
            onFailed: err => getMyActiveTasksFailed(err),
            onSuccess: tasks => getMyActiveTasksSuccess(tasks.map(x => x.id))
        }
        dispatch(getTasks(configs))
    }
}