import { GET_AUTH } from "../../components/app/App.redux.actionTypes";
import { POST_AUTH } from "../../routes/login/Login.redux.actionTypes";
import { POST_USER } from "../../routes/register/Register.redux.actionTypes";
import { LOGOUT } from "../../redux/types";
import Cookies from "js-cookie";

export const authReducer = (state = { isAuthenticated: false }, action) => {
    console.log({action},912)
    if (action.error) return { 
        ...state, [action.type]: action.error.response.data
    }
    switch (action.type) {
        case GET_AUTH:
            return { ...state, isAuthenticated: true, [action.type]: { ...action.payload, type: action.type } }
        case POST_AUTH:
            Cookies.set("eazytask:token", action.payload.data.token);
            return { ...state, isAuthenticated: true, [action.type]: { ...action.payload, type: action.type }}
        case LOGOUT: 
            Cookies.set("eazytask:token", null);
            return { ...state, isAuthenticated: false }
        case POST_USER:
            return { ...state, isAuthenticated: true, [action.type]: { ...action.payload, type: action.type } }
        default: return state;
    }
}
