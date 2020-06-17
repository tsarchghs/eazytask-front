import {
    GET_TASK,
    GET_TASK_FAILED,
    GET_TASK_REQUEST,
    GET_TASK_SUCCESS,
    GET_TASKS_REQUEST,
    GET_TASKS_FAILED,
    GET_TASKS_SUCCESS,
    GET_TASKS_COUNT_REQUEST,
    GET_TASKS_COUNTS_FAILED,
    GET_TASKS_COUNT_SUCCESS,
    PATCH_TASKS_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    byIds: {},
    allIds: [],
    [GET_TASK]: {},
    loading: true,
    error: false,
    errorResponse: undefined,
    tasks_count: {
        loading: true,
        count: 0,
        err: undefined
    }
}


export default (state = INITIAL_STATE, action) => {
    console.log("tasks", action)
    switch (action.type) {
        case GET_TASK_REQUEST:
            let exists = state.allIds.indexOf(action.id) !== -1;
            let loading = !exists 
            if (!exists) state.allIds.push(action.id);
            if (!state.byIds[action.id]) state.byIds[action.id] = {}
            state.byIds[action.id] = { 
                ...state.byIds[action.id], 
                loading, 
                error: false, 
                errorResponse: undefined, 
                ...action.payload 
            }
            return { ...state }
        case GET_TASK_FAILED:
            if (!state.byIds[action.id]) state.byIds[action.id] = {}
            state.byIds[action.id] = { 
                ...state.byIds[action.id], 
                loading: false,
                error: true,
                errorResponse: action.err,
                ...action.payload
            }
            return { ...state }
        case GET_TASK_SUCCESS:
            if (!state.byIds[action.id]) state.byIds[action.id] = {}
            state.byIds[action.id] = { 
                ...state.byIds[action.id],
                loading: false, 
                error: false, 
                errorResponse: undefined, 
                ...action.payload 
            }
            return { ...state }

        // case GET_TASKS_REQUEST:
        //     return { ...state, loading: true }
        case GET_TASKS_SUCCESS:
            let allIds = state.allIds;
            let byIds = state.byIds;
            for (let task of action.payload) {
                if (allIds.indexOf(task.id) === -1) allIds.push(task.id);
                if (byIds[task.id]) byIds[task.id] = { ...byIds[task.id], ...task }
                else byIds[task.id] = task
            }
            return { ...state, loading: false, byIds, allIds }


        case GET_TASKS_COUNT_REQUEST:
            return { ...state }
        case GET_TASKS_COUNTS_FAILED:
            state.err = action.err;
            return { ...state }
        case GET_TASKS_COUNT_SUCCESS:
            state.tasks_count.loading = false;
            state.tasks_count.count = action.count;
            return { ...state }

        case PATCH_TASKS_SUCCESS:
            state.byIds[action.id] = {
                ...state.byIds[action.id],
                loading: false,
                error: false,
                errorResponse: undefined,
                ...action.payload
            }
            return { ...state }

        default: return state
    }
}