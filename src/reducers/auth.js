import { 
    GET_AUTH,
    GET_AUTH_REQUEST,
    GET_AUTH_SUCCESS,
    GET_AUTH_FAILED,
    POST_AUTH, 
    POST_AUTH_REQUEST,
    POST_AUTH_SUCCESS,
    POST_AUTH_FAILED, 
    POST_USER,
    POST_USER_REQUEST,
    POST_USER_SUCCESS,
    POST_USER_FAILED,  
    LOGOUT 
} from "../actionTypes"

const INITIAL_STATE = {
    isAuthenticated: false,
    POST_AUTH: { loading: false, error: false, errorResponse: undefined },
    GET_AUTH: { loading: false, error: false, errorResponse: undefined },
    POST_USER: { loading: false, error: false, errorResponse: undefined }
}


export default (state = INITIAL_STATE, action) => {
    console.log({ action }, 912)
    let token = localStorage.getItem("eazytask:token");
    console.log({before:token})
    let onRequest = { loading: true, error: false, errorResponse: undefined }
    let onFailed = { errors: action.err && action.err.response.data.errors, loading: false, error: true }
    switch (action.type) {
        case GET_AUTH_REQUEST:
            return { ...state, isAuthenticated: false, GET_AUTH: onRequest }
        case GET_AUTH_FAILED:
            return { ...state, isAuthenticated: false, GET_AUTH: onFailed }    
        case GET_AUTH_SUCCESS:
            state.profile = action.payload.data.user
            return { ...state, isAuthenticated: true, GET_AUTH: { data: action.payload, type: action.type, loading: false } }

        case POST_AUTH_REQUEST:
            return { ...state, isAuthenticated: false, POST_AUTH: onRequest }
        case POST_AUTH_FAILED:
            return { ...state, isAuthenticated: false , POST_AUTH: onFailed }
        case POST_AUTH_SUCCESS:
            state.profile = action.payload.data.user
            localStorage.setItem("eazytask:token", action.payload.data.token);
            return { ...state, isAuthenticated: true, POST_AUTH: { data: action.payload, type: action.type, loading: false } }

        case POST_USER_REQUEST:
            return { ...state, isAuthenticated: false, POST_USER: onRequest }
        case POST_USER_FAILED:
            return { ...state, isAuthenticated: false, POST_USER: onFailed }
        case POST_USER_SUCCESS:
            state.profile = action.payload.data.user
            localStorage.setItem("eazytask:token", action.payload.data.token);
            return { ...state, isAuthenticated: true, POST_USER: { data: action.payload, type: action.type, loading: false } }

            
        case LOGOUT:
            localStorage.setItem("eazytask:token", null);
            return { ...state, isAuthenticated: false }
        default: return state;
    }
}
