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
    GET_MY_ACTIVE_OFFERS_REQUEST,
    GET_MY_ACTIVE_OFFERS_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    createTask: {
        loading: true,
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
        ids: []
    },
    activeListing2: {
        loading: true,
        ids: []
    },
    updateTask: {
        loading: false,
        finished: false
    }
}

export default (state = INITIAL_STATE, action) => {
    console.log("APP", action)
    switch (action.type) {
        case SET_CREATE_TASK:
            state.createTask = action.createTask
            return { ...state }
        case GET_MY_ACTIVE_TASKS_REQUEST:
            let exists5 = state.myActiveTasks.ids.indexOf(action.id) !== -1;
            state.myActiveTasks.loading = !exists5;
            return { ...state }
        case GET_MY_ACTIVE_TASKS_SUCCESS:
            state.myActiveTasks.loading = false;
            state.myActiveTasks.ids = action.ids;
            return { ...state }

        case GET_MY_ACTIVE_OFFERS_REQUEST:
            let exists = state.myActiveOffers.ids.indexOf(action.id) !== -1;
            state.myActiveOffers.loading = !exists;
            return { ...state }
        case GET_MY_ACTIVE_OFFERS_SUCCESS:
            state.myActiveOffers.loading = false;
            state.myActiveOffers.ids = action.ids;
            return { ...state }

        case GET_ACTIVE_LISTING_REQUEST:
            console.log("state.activeListing.ids.length", state.activeListing.ids.length)
            let exists2 = Boolean(state.activeListing.ids.length)
            state.activeListing.loading = !exists2;
        case GET_ACTIVE_LISTING_FAILED:
            state.activeListing.loading = false;
            return { ...state }
        case GET_ACTIVE_LISTING_SUCCESS:
            state.activeListing.loading = false;
            state.activeListing.ids = action.ids;
            return { ...state }


        case GET_ACTIVE_LISTING2_REQUEST:
            let exists3 = Boolean(state.activeListing2.ids.length)
            state.activeListing2.loading = !exists3;
        case GET_ACTIVE_LISTING2_FAILED:
            state.activeListing2.loading = false;
            return { ...state }
        case GET_ACTIVE_LISTING2_SUCCESS:
            state.activeListing2.loading = false;
            state.activeListing2.ids = action.ids;
            return { ...state }
        default: return state
    }
}