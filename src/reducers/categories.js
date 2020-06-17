import {
    GET_CATEGORIES_REQUEST,
    GET_CATEGORIES_FAILED,
    GET_CATEGORIES_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    allIds: [],
    byIds: {},
    loading: true,
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_CATEGORIES_REQUEST:
            return { ...state, loading: true }
        case GET_CATEGORIES_SUCCESS:
            let allIds = []
            let byIds = {}
            for (let cities of action.payload) {
                allIds.push(cities.id);
                byIds[cities.id] = cities
            }
            return { ...state, loading: false, byIds, allIds }
        default: return state
    }
}