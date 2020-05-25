import {
    GET_TASK,
    GET_TASK_FAILED,
    GET_TASK_REQUEST,
    GET_TASK_SUCCESS
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
            state[GET_TASK][action.id] = { loading: true, error: false, errorResponse: undefined }
            return { ...state }
        case GET_TASK_FAILED:
            state[GET_TASK][action.id] = { loading: false, error: true, errorResponse: action.err }
            return { ...state }
        case GET_TASK_SUCCESS:
            state[GET_TASK][action.id] = { loading: false, error: false, errorResponse: undefined }
            state.byIds[action.id] = action.payload;
            state.allIds.push(action.id);
            return { ...state }
        default: return state
    }
}