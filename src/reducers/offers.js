import {
    POST_OFFERS_FAILED,
    POST_OFFERS_REQUEST,
    POST_OFFERS_SUCCESS,
    GET_OFFER_FAILED,
    GET_OFFER_REQUEST,
    GET_OFFER_SUCCESS,
    ACCEPT_OFFER_REQUEST,
    ACCEPT_OFFER_FAILED,
    ACCEPT_OFFER_SUCCESS,
    GET_OFFERS_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = {
    byIds: {},
    allIds: [],
    loading: true,
    error: false,
    errorResponse: undefined
}


export default (state = INITIAL_STATE, action) => {
    console.log("offers", action)
    switch (action.type) {
        case GET_OFFERS_SUCCESS:
            let allIds = state.allIds;
            let byIds = state.byIds;
            for (let offer of action.payload) {
                if (allIds.indexOf(offer.id) === -1) allIds.push(offer.id);
                if (byIds[offer.id]) byIds[offer.id] = { ...byIds[offer.id], ...offer }
                else byIds[offer.id] = offer
            }
            return { ...state, loading: false, byIds, allIds }


        case POST_OFFERS_REQUEST:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: true, error: false, errorResponse: undefined }
            return { ...state }
        case POST_OFFERS_FAILED:
            state.byIds[action.id] = { loading: false, error: true, errorResponse: action.err }
            return { ...state }
        case POST_OFFERS_SUCCESS:
            state.byIds[action.id] = { 
                loading: false, error: false, errorResponse: undefined, ...action.payload 
            }
            return { ...state }

        case GET_OFFER_REQUEST:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { loading: true, error: false, errorResponse: undefined }
            return { ...state }
        case GET_OFFER_FAILED:
            state.byIds[action.id] = { loading: false, error: true, errorResponse: action.err }
            return { ...state }
        case GET_OFFER_SUCCESS:
            state.byIds[action.id] = {
                loading: false, error: false, errorResponse: undefined, ...action.payload
            }
            return { ...state }

        case ACCEPT_OFFER_REQUEST:
            if (state.allIds.indexOf(action.id) === -1) state.allIds.push(action.id);
            state.byIds[action.id] = { 
                loading2: true, 
                error2: false, 
                ...state.byIds[action.id] 
            }
            return { ...state }
        case ACCEPT_OFFER_FAILED:
            state.byIds[action.id] = { 
                loading2: false,
                error2: true,
                error2Response: action.err,
                ...state.byIds[action.id] 
            }
            return { ...state }
        case ACCEPT_OFFER_SUCCESS:
            state.byIds[action.id] = {
                loading2: false, 
                error2: false, 
                error2Response: undefined, 
                ...state.byIds[action.id],
                ...action.payload
            }
            return { ...state }

        default: return state
    }
}