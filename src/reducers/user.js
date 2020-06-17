import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
} from "../actionTypes"

const INITIAL_STATE = {
    byIds: {},
    allIds: [],
    loading: true,
    errorResponse: undefined
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_USER_REQUEST:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: true, error: undefined }
            return { ...state }
        case GET_USER_FAILED:
            state.byIds[action.id] = { loading: false, error: action.err }
            return { ...state }
        case GET_USER_SUCCESS:
            state.byIds[action.id] = {
                loading: false, error: undefined, ...action.payload.data
            }
            return { ...state }
        default: return state;
    }
}
