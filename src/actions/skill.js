import {
    GET_SKILLS_REQUEST,
    GET_SKILLS_SUCCESS,
    GET_SKILLS_FAILED,
} from "../actionTypes";
import axios from "../utils/axios";

export const getSkillsRequest = () => ({
    type: GET_SKILLS_REQUEST
})

export const getSkillsFailed = err => ({
    type: GET_SKILLS_FAILED, err
})

export const getSkillsSuccess = payload => ({
    type: GET_SKILLS_SUCCESS, payload
})

export const getSkills = () => {
    console.log("LOG_SKILLS")
    return dispatch => {
        dispatch(getSkillsRequest())
        return axios.get("/skills")
            .then(({ data }) => {
                dispatch(getSkillsSuccess(data.data));
            }).catch(err => dispatch(getSkillsFailed(err)));
    };
}
