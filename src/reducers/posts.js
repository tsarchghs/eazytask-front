import {
    GET_POSTS_REQUEST,
    GET_POSTS_FAILED,
    GET_POSTS_SUCCESS,
    POST_POSTS_REQUEST,
    POST_POSTS_FAILED,
    POST_POSTS_SUCCESS,
    GET_POST_REQUEST,
    GET_POST_FAILED,
    GET_POST_SUCCESS,
    PATCH_POSTS_REQUEST,
    PATCH_POSTS_FAILED,
    PATCH_POSTS_SUCCESS,
    DELETE_POSTS_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    allIds: [],
    byIds: {},
    loading: true,
    create: {
        success: undefined,
        err: undefined,
        loading: false
    }
}


export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case GET_POSTS_REQUEST:
            return { ...state, loading: true }
        case GET_POSTS_SUCCESS:
            let allIds = []
            let byIds = {}
            for (let post of action.payload) {
                allIds.push(post.id);
                byIds[post.id] = post
            }
            return { ...state, loading: false, byIds, allIds }

        case GET_POST_REQUEST:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: true }
            return { ...state, byIds: { ...state.byIds }, allIds: [...state.allIds] }
        case GET_POST_FAILED:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: false, err: action.err }
            return { ...state, byIds: { ...state.byIds }, allIds: [...state.allIds] }
        case GET_POST_SUCCESS:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { ...action.payload, loading: false }
            return { ...state, byIds: { ...state.byIds }, allIds: [...state.allIds] }

        case PATCH_POSTS_REQUEST:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: true }
            return { ...state, byIds: { ...state.byIds }, allIds: [...state.allIds] }
        case PATCH_POSTS_FAILED:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: false, err: action.err }
            return { ...state, byIds: { ...state.byIds }, allIds: [...state.allIds] }
        case PATCH_POSTS_SUCCESS:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { ...action.payload, loading: false }
            return { ...state, byIds: { ...state.byIds }, allIds: [...state.allIds] }

        case POST_POSTS_REQUEST:
            state.create = { ...INITIAL_STATE.create, loading: true }
            return { ...state }
        case POST_POSTS_FAILED:
            state.create = { success: false, err: action.err, loading: false }
            return { ...state }
        case POST_POSTS_SUCCESS:
            state.create = { success: true, err: undefined, loading: false }
            return { ...state }

        case DELETE_POSTS_SUCCESS:
            state.allIds = state.allIds.filter(id => id != action.id);
            delete state.byIds[action.id];
            return { ...state, byIds: { ...state.byIds }, allIds: [...state.allIds] }
        default: return state
    }
}