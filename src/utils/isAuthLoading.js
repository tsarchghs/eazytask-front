import { 
    GET_AUTH,
    POST_AUTH,
    POST_USER,
} from "../actionTypes";

export default auth => {
    let types = [GET_AUTH, POST_AUTH, POST_USER]
    for (let type of types){
        if (auth[type].loading) return true;
    }
    return false;
}