import {
    POST_OFFERS_REQUEST,
    POST_OFFERS_FAILED,
    POST_OFFERS_SUCCESS,
    GET_OFFER_REQUEST,
    GET_OFFER_FAILED,
    GET_OFFER_SUCCESS,
    ACCEPT_OFFER_REQUEST,
    ACCEPT_OFFER_FAILED,
    ACCEPT_OFFER_SUCCESS,
    GET_OFFERS_REQUEST,
    GET_OFFERS_FAILED,
    GET_OFFERS_SUCCESS
} from "../actionTypes";
import axios from "../utils/axios";
import queryString from "query-string";

export const postOffersRequest = id => ({
    type: POST_OFFERS_REQUEST, id
})

export const postOffersFailed = (id,err) => ({
    type: POST_OFFERS_FAILED, id, err
})

export const postOffersSuccess = (id,payload) => ({
    type: POST_OFFERS_SUCCESS, id, payload
})

export const getOfferRequest = id => ({
    type: GET_OFFER_REQUEST, id
})

export const getOfferFailed = (id, err) => ({
    type: GET_OFFER_FAILED, id, err
})

export const getOfferSuccess = (id, payload) => ({
    type: GET_OFFER_SUCCESS, id, payload
})

export const acceptOfferRequest = id => ({
    type: ACCEPT_OFFER_REQUEST, id
})

export const acceptOfferFailed = (id, err) => ({
    type: ACCEPT_OFFER_FAILED, id, err
})

export const acceptOfferSuccess = (id, payload) => ({
    type: ACCEPT_OFFER_SUCCESS, id, payload
})

export const getOffersRequest = () => ({
    type: GET_OFFERS_REQUEST
})

export const getOffersFailed = err => ({
    type: GET_OFFERS_FAILED, err
})

export const getOffersSuccess = payload => ({
    type: GET_OFFERS_SUCCESS, payload
})


export const getOffers = ({ filters, onRequest, onFailed, onSuccess, UserId } = {}) => {
    return dispatch => {
        dispatch(getOffersRequest())
        if (onRequest) dispatch(onRequest);
        let query = queryString.stringify(filters)
        let byUser = UserId ? "UserId=" + UserId + "&" : ""
        return axios.get("/offers?" + byUser + query)
            .then(({ data }) => {
                dispatch(getOffersSuccess(data.data));
                if (onSuccess) dispatch(onSuccess(data.data));
            }).catch(err => {
                dispatch(getOffersFailed(err))
                if (onFailed) dispatch(onFailed(err));
            });
    };
}

export const getOffer = (offerId, { onRequest, onFailed, onSuccess } = {}) => {
    return dispatch => {
        dispatch(getOfferRequest(offerId))
        if (onRequest) dispatch(onRequest);
        return axios.get("/offers/" + offerId + "?fields=task,tasker")
            .then(({ data }) => {
                dispatch(getOfferSuccess(offerId, data.data));
                if (onSuccess) dispatch(onSuccess(data.data));
            }).catch(err => {
                dispatch(getOfferFailed(offerId, err))
                if (onFailed) dispatch(onFailed(err));
            });
    };
}

export const acceptOffer = (taskId,offerId, { onRequest, onFailed, onSuccess } = {}) => {
    return dispatch => {
        dispatch(acceptOfferRequest(offerId))
        if (onRequest) dispatch(onRequest);
        return axios.post("/tasks/" + taskId + "/offers/" + offerId + "/accept?fields=task,tasker")
            .then(({ data }) => {
                dispatch(acceptOfferSuccess(offerId, data.data));
                if (onSuccess) dispatch(onSuccess(data.data));
            }).catch(err => {
                dispatch(acceptOfferFailed(offerId, err))
                if (onFailed) dispatch(onFailed(err));
            });
    };
}


export const postOffers = body => {
    return dispatch => {
        dispatch(postOffersRequest())
        return axios.post(`/offers?fields=task,tasker`, body)
            .then(({ data }) => {
                dispatch(postOffersSuccess(data.data));
            }).catch(err => dispatch(postOffersFailed(err)));
    };
}
