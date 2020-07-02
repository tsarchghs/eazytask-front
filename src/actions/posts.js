import {
    GET_POSTS_REQUEST,
    GET_POSTS_SUCCESS,
    GET_POSTS_FAILED,
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
} from "../actionTypes";
import axios from "../utils/axios";
import { objectToFormData } from 'object-to-formdata';

export const getPostsRequest = () => ({
    type: GET_POSTS_REQUEST
})

export const getPostsFailed = err => ({
    type: GET_POSTS_FAILED, err
})

export const getPostsSuccess = payload => ({
    type: GET_POSTS_SUCCESS, payload
})

export const getPosts = () => {
    return dispatch => {
        dispatch(getPostsRequest())
        return axios.get("/posts")
            .then(({ data }) => {
                dispatch(getPostsSuccess(data.data));
            }).catch(err => dispatch(getPostsFailed(err)));
    };
}

export const getPostRequest = id => ({
    type: GET_POST_REQUEST, id
})

export const getPostFailed = (id,err) => ({
    type: GET_POST_FAILED, id, err
})

export const getPostSuccess = (id,payload) => ({
    type: GET_POST_SUCCESS, id, payload
})

export const getPost = id => {
    return dispatch => {
        dispatch(getPostRequest(id))
        return axios.get("/posts/" + id)
            .then(({ data }) => {
                dispatch(getPostSuccess(id,data.data));
            }).catch(err => dispatch(getPostFailed(id,err)));
    };
}

export const postPostsRequest = () => ({
    type: POST_POSTS_REQUEST
})

export const postPostsFailed = err => ({
    type: POST_POSTS_FAILED, err
})

export const postPostsSuccess = payload => ({
    type: POST_POSTS_SUCCESS, payload
})

export const postPosts = ({ title, content, thumbnail }) => {
    return dispatch => {
        dispatch(postPostsRequest())
        let body = objectToFormData({ title, content, thumbnail })
        return axios.post("/posts", body)
            .then(({ data }) => {
                dispatch(postPostsSuccess(data.data));
            }).catch(err => dispatch(postPostsFailed(err)));
    };
}

export const patchPostsRequest = id => ({
    type: PATCH_POSTS_REQUEST, id
})

export const patchPostsFailed = (id,err) => ({
    type: PATCH_POSTS_FAILED, id, err
})

export const patchPostsSuccess = (id,payload) => ({
    type: PATCH_POSTS_SUCCESS, id, payload
})

export const patchPosts = (id, { title, content, thumbnail }) => {
    return dispatch => {
        dispatch(patchPostsRequest(id))
        let body = objectToFormData({ title, content, thumbnail })
        return axios.patch("/posts/" + id, body)
            .then(({ data }) => {
                dispatch(patchPostsSuccess(id, data.data));
            }).catch(err => dispatch(patchPostsFailed(id, err)));
    };
}

export const deletePostsSuccess = id => ({
    type: DELETE_POSTS_SUCCESS, id
})


export const deletePosts = id => {
    return dispatch => {
        return axios.delete("/posts/" + id)
            .then(({ data }) => {
                dispatch(deletePostsSuccess(id));
            }).catch(err => {});
    };
}
