import {
    GET_LANGUAGES_REQUEST,
    GET_LANGUAGES_FAILED,
    GET_LANGUAGES_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    data: undefined,
    loading: true,
    error: false,
    errorResponse: undefined
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_LANGUAGES_REQUEST:
            return { ...state, loading: true }
        case GET_LANGUAGES_SUCCESS:
            let allIds = []
            let byIds = {}
            for (let language of action.payload) {
                allIds.push(language.id);
                byIds[language.id] = language
            }
            return { ...state, loading: false, byIds, allIds }
        default: return state
    }
}