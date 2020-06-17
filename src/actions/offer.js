import {
    POST_OFFERS_REQUEST,
    POST_OFFERS_FAILED,
    POST_OFFERS_SUCCESS
} from "../actionTypes";
import axios from "../utils/axios";

export const postOffersRequest = () => ({
    type: POST_OFFERS_REQUEST
})

export const postOffersFailed = err => ({
    type: POST_OFFERS_FAILED, err
})

export const postOffersSuccess = payload => ({
    type: POST_OFFERS_SUCCESS, payload
})

export const postOffers = body => {
    return dispatch => {
        dispatch(postOffersRequest())
        return axios.post("/offers", body)
            .then(({ data }) => {
                dispatch(postOffersSuccess(data.data));
            }).catch(err => dispatch(postOffersFailed(err)));
    };
}
