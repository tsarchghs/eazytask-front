
import { postAuth as _postAuth} from "./Login.redux.action";
import axios from "../../utils/axios";

export const postAuth = ({email,password}) => {
    return dispatch => {
        return axios.post("/auth",{
            email, password
        })
            .then(({ data }) => {
                console.log(data, 7777, _postAuth(data))
                dispatch(_postAuth(data));
            }).catch(err => dispatch(_postAuth(null,err)));
    };
}
