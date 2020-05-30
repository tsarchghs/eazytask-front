import {
    GET_TASK,
    GET_TASK_FAILED,
    GET_TASK_REQUEST,
    GET_TASK_SUCCESS,
    GET_TASKS_REQUEST,
    GET_TASKS_FAILED,
    GET_TASKS_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    byIds: {},
    allIds: [],
    [GET_TASK]: {},
    loading: true,
    error: false,
    errorResponse: undefined
}


export default (state = INITIAL_STATE, action) => {
    console.log("tasks", action)
    switch (action.type) {
        case GET_TASK_REQUEST:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: true, error: false, errorResponse: undefined }
            return { ...state }
        case GET_TASK_FAILED:
            state.byIds[action.id] = { loading: false, error: true, errorResponse: action.err }
            return { ...state }
        case GET_TASK_SUCCESS:
            state.byIds[action.id] = { 
                loading: false, error: false, errorResponse: undefined, data: action.payload 
            }
            return { ...state }

        // case GET_TASKS_REQUEST:
        //     return { ...state, loading: true }
        case GET_TASKS_SUCCESS:
            let allIds = state.allIds;
            let byIds = state.byIds;
            for (let task of action.payload) {
                if (allIds.indexOf(task.id) !== -1) allIds.push(task.id);
                byIds[task.id] = task
            }
            return { ...state, loading: false, byIds, allIds }
        default: return state
    }
}