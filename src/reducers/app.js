import {
    SET_CREATE_TASK,
    GET_MY_ACTIVE_TASKS_REQUEST,
    GET_MY_ACTIVE_TASKS_FAILED,
    GET_MY_ACTIVE_TASKS_SUCCESS,
    GET_ACTIVE_LISTING_REQUEST,
    GET_ACTIVE_LISTING_FAILED,
    GET_ACTIVE_LISTING_SUCCESS,
    GET_ACTIVE_LISTING2_REQUEST,
    GET_ACTIVE_LISTING2_FAILED,
    GET_ACTIVE_LISTING2_SUCCESS,
    GET_ACTIVE_LISTING3_REQUEST,
    GET_ACTIVE_LISTING3_FAILED,
    GET_ACTIVE_LISTING3_SUCCESS,
    GET_MY_ACTIVE_OFFERS_REQUEST,
    GET_MY_ACTIVE_OFFERS_SUCCESS,
    VALIDATE_VERIFICATION_CODE_REQUEST,
    VALIDATE_VERIFICATION_CODE_FAILED,
    VALIDATE_VERIFICATION_CODE_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAILED,
    RESET_PASSWORD_SUCCESS,
    RE_INITIALISE_FORGET_PASSWORD
} from "../actionTypes"

const INITIAL_STATE = {
    createTask: {
        loading: false,
        task: undefined
    },
    myActiveTasks: {
        loading: true,
        ids: []
    },
    myActiveOffers: {
        loading: true,
        ids: []
    },
    activeListing: {
        loading: true,
        err: undefined,
        ids: []
    },
    activeListing2: {
        loading: true,
        err: undefined,
        ids: []
    },
    activeListing3: {
        loading: true,
        err: undefined,
        ids: []
    },
    updateTask: {
        loading: false,
        finished: false
    },
    validateVerificationCode: {
        loading: false,
        err: undefined,
        success: undefined
    },
    resetPassword: {
        loading: false,
        err: undefined,
        success: undefined
    }
}

export default (state = INITIAL_STATE, action) => {
    console.log("APP", action)
    switch (action.type) {
        case RE_INITIALISE_FORGET_PASSWORD:
            state.validateVerificationCode = {
                loading: false,
                err: undefined,
                success: undefined
            }
            state.resetPassword = {
                loading: false,
                err: undefined,
                success: undefined
            }
            return { ...state }
        case SET_CREATE_TASK:
            state.createTask = action.createTask
            return { ...state, createTask: { ...state.createTask } }
        case GET_MY_ACTIVE_TASKS_REQUEST:
            state.myActiveTasks.loading = true;
            return { ...state, myActiveTasks: { ...state.myActiveTasks } }
        case GET_MY_ACTIVE_TASKS_SUCCESS:
            state.myActiveTasks.loading = false;
            state.myActiveTasks.ids = action.ids;
            return { ...state, myActiveTasks: { ...state.myActiveTasks } }

        case GET_MY_ACTIVE_OFFERS_REQUEST:
            let exists = state.myActiveOffers.ids.indexOf(action.id) !== -1;
            state.myActiveOffers.loading = !exists;
            return { ...state, myActiveOffers: { ...state.myActiveOffers } }
        case GET_MY_ACTIVE_OFFERS_SUCCESS:
            state.myActiveOffers.loading = false;
            state.myActiveOffers.ids = action.ids;
            return { ...state, myActiveOffers: { ...state.myActiveOffers } }

        case GET_ACTIVE_LISTING_REQUEST:
            state.activeListing.loading = true;
            return { ...state, activeListing: { ...state.activeListing } }
        case GET_ACTIVE_LISTING_FAILED:
            state.activeListing.loading = false;
            state.activeListing.error = action.err;
            return { ...state, activeListing: { ...state.activeListing } }
        case GET_ACTIVE_LISTING_SUCCESS:
            state.activeListing.loading = false;
            state.activeListing.ids = action.ids;
            return { ...state, activeListing: { ...state.activeListing } }

        case GET_ACTIVE_LISTING2_REQUEST:
            state.activeListing2.loading = true;
            return { ...state, activeListing2: { ...state.activeListing2 } }
        case GET_ACTIVE_LISTING2_FAILED:
            state.activeListing2.loading = false;
            state.activeListing2.error = action.err;
            return { ...state, activeListing2: { ...state.activeListing2 } }
        case GET_ACTIVE_LISTING2_SUCCESS:
            state.activeListing2.loading = false;
            state.activeListing2.ids = action.ids;
            return { ...state, activeListing2: { ...state.activeListing2 } }

        case GET_ACTIVE_LISTING3_REQUEST:
            state.activeListing3.loading = true;
            return { ...state, activeListing3: { ...state.activeListing3 } }
        case GET_ACTIVE_LISTING3_FAILED:
            state.activeListing3.loading = false;
            state.activeListing3.error = action.err;
            return { ...state, activeListing3: { ...state.activeListing3 } }
        case GET_ACTIVE_LISTING3_SUCCESS:
            state.activeListing3.loading = false;
            state.activeListing3.ids = action.ids;
            return { ...state, activeListing3: { ...state.activeListing3 } }

        case VALIDATE_VERIFICATION_CODE_REQUEST:
            state.validateVerificationCode = {
                loading: true,
                err: undefined,
                success: undefined
            }
            return { ...state, validateVerificationCode: { ...state.validateVerificationCode} }
        case VALIDATE_VERIFICATION_CODE_FAILED:
            state.validateVerificationCode.err = action.err;
            state.validateVerificationCode.loading = false;
            state.validateVerificationCode.success = false;
            return { ...state, validateVerificationCode: { ...state.validateVerificationCode } }

        case VALIDATE_VERIFICATION_CODE_SUCCESS:
            state.validateVerificationCode.success = true;
            state.validateVerificationCode.loading = false;
            return { ...state, validateVerificationCode: { ...state.validateVerificationCode } }

        case RESET_PASSWORD_REQUEST:
            state.resetPassword = {
                loading: true,
                err: undefined,
                success: undefined
            }
            return { ...state, resetPassword: { ...state.resetPassword } }
        case RESET_PASSWORD_FAILED:
            state.resetPassword.err = action.err;
            state.resetPassword.loading = false;
            state.resetPassword.success = false;
            return { ...state, resetPassword: { ...state.resetPassword } }

        case RESET_PASSWORD_SUCCESS:
            state.resetPassword.success = true;
            state.resetPassword.loading = false;
            return { ...state, resetPassword: { ...state.resetPassword } }

        default: return state
    }
}