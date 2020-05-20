import {
    GET_SKILLS_REQUEST,
    GET_SKILLS_FAILED,
    GET_SKILLS_SUCCESS
} from "../actionTypes"

const INITIAL_STATE = { 
    data: undefined,
    loading: true, 
    error: false,
    errorResponse: undefined
 }


export default (state = INITIAL_STATE, action) => {
    console.log("skills",action)
    switch (action.type) {
        case GET_SKILLS_REQUEST:
            return { ...state, loading: true }
        case GET_SKILLS_SUCCESS:
            let allIds = []
            let byIds = {}
            for (let skill of action.payload){
                allIds.push(skill.id);
                byIds[skill.id] = skill
            }
            return { ...state, loading: false, byIds, allIds }
        default: return state
    }
}