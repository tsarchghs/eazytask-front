import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_FAILED,
    GET_MESSAGES_SUCCESS,
    POST_MESSAGES_REQUEST,
    POST_MESSAGES_FAILED,
    POST_MESSAGES_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = { 
    tasks: { }
}


export default (state = INITIAL_STATE, action) => {
    console.log("skills",action)
    switch (action.type) {
        case GET_MESSAGES_REQUEST:
            state.tasks[action.taskId] = { loading: true, allIds: [], byIds: {} }
            return { ...state }
        case GET_MESSAGES_FAILED:
            state.tasks[action.taskId].error = true;
            state.tasks[action.taskId].errorResponse = action.err;
            return { ...state }
        case GET_MESSAGES_SUCCESS:
            let allIds = []
            let byIds = {}
            for (let message of action.payload) {
                allIds.push(message.id);
                byIds[message.id] = message
            }
            state.tasks[action.taskId] = { allIds, byIds }
            return { ...state }

        case POST_MESSAGES_SUCCESS:
            let message = action.payload;
            let task = state.tasks[action.taskId] || { allIds: [], byIds: {} }
            console.log("state.tasks[action.taskId]", state.tasks[action.taskId],"task",task)
            task.allIds.push(message.id);
            task.byIds[message.id] = message
            state.tasks[action.taskId] = task;
            return { ...state }

        default: return state
    }
}