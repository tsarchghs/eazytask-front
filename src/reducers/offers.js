import {
    POST_OFFERS_FAILED,
    POST_OFFERS_REQUEST,
    POST_OFFERS_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    byIds: {},
    allIds: [],
    loading: true,
    error: false,
    errorResponse: undefined
}


export default (state = INITIAL_STATE, action) => {
    console.log("tasks", action)
    switch (action.type) {
        case POST_OFFERS_REQUEST:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: true, error: false, errorResponse: undefined }
            return { ...state }
        case POST_OFFERS_FAILED:
            state.byIds[action.id] = { loading: false, error: true, errorResponse: action.err }
            return { ...state }
        case POST_OFFERS_SUCCESS:
            state.byIds[action.id] = { 
                loading: false, error: false, errorResponse: undefined, data: action.payload 
            }
            return { ...state }
        default: return state
    }
}