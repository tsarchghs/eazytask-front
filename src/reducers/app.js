import {
    SET_CREATE_TASK,
    GET_MY_ACTIVE_TASKS_REQUEST,
    GET_MY_ACTIVE_TASKS_FAILED,
    GET_MY_ACTIVE_TASKS_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    createTask: {
        loading: true,
        task: undefined
    },
    myActiveTasks: {
        loading: true,
        ids: []
    }
}

export default (state = INITIAL_STATE, action) => {
    console.log("APP", action)
    switch (action.type) {
        case SET_CREATE_TASK:
            state.createTask = action.createTask
            return { ...state }
        case GET_MY_ACTIVE_TASKS_REQUEST:
            state.myActiveTasks.loading = true;
            return { ...state }
        case GET_MY_ACTIVE_TASKS_SUCCESS:
            state.myActiveTasks.loading = false;
            state.myActiveTasks.ids = action.ids;
            return { ...state }
        default: return state
    }
}