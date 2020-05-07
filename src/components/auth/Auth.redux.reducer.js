import { POST_AUTH } from "../../redux/actionTypes";

export const authReducer = (state = { isAuthenticated: false }, action) => {
    if (action.error) return action.error.response.data
    switch (action.type) {
        case POST_AUTH:
            return { ...action.payload, isAuthenticated: true}
        default: return state;
    }
}