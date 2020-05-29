import {
    SET_CREATE_TASK
} from "../actionTypes"

const INITIAL_STATE = {
    createTask: {
        loading: true,
        task: undefined
    },
}

export default (state = INITIAL_STATE, action) => {
    console.log("APP", action)
    switch (action.type) {
        case SET_CREATE_TASK:
            state.createTask = action.createTask
            return { ...state }
        default: return state
    }
}