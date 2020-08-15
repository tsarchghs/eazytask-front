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
    UPDATE_AUTH_PROFILE,
    UPDATE_AUTH_PROFILE_TASKER,
    LOGOUT 
} from "../actionTypes"
import { toast } from 'react-toastify';

const INITIAL_STATE = {
    isAuthenticated: undefined,
    POST_AUTH: { loading: false, error: false, errorResponse: undefined },
    GET_AUTH: { loading: false, error: false, errorResponse: undefined },
    POST_USER: { loading: false, error: false, errorResponse: undefined }
}


export default (state = INITIAL_STATE, action) => {
    console.log({ action }, 912)
    let token = localStorage.getItem("eazytask:token");
    console.log({before:token})
    let onRequest = { loading: true, error: false, errorResponse: undefined }
    let onFailed = { 
        isAuthenticated: false, 
        errors: action.err && (
            (action.err.response && action.err.response.data && action.err.response.data.errors) ||
            action.err.response
        ),   
        loading: false, 
        error: true 
    }
    if (action.err && action.err.message === "Network Error") {
        console.log("action.erraction.err", action.err)
        toast.error(window.__GENERAL_ERROR_VALUE__[localStorage.getItem("app_lang")])
    }

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
            console.log("action.payload.data", action.payload)
            state.profile = action.payload.data.user
            // localStorage.setItem("eazytask:token", action.payload.data.token);
            return { ...state, isAuthenticated: false, POST_USER: { data: action.payload, type: action.type, loading: false } }

        case UPDATE_AUTH_PROFILE:
            return { ...state, profile: { ...state.profile, ...action.data } }
        case UPDATE_AUTH_PROFILE_TASKER:
            if (!state.profile) state.profile = { Tasker: {} }
            state.profile.Tasker = { ...state.profile.tasker, ...action.data }
            return { ...state }
            
        case LOGOUT:
            localStorage.setItem("eazytask:token", null);
            return { ...state, isAuthenticated: false }
        default: return state;
    }
}
