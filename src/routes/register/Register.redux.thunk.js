
import { postUser as _postUser} from "./Register.redux.action";
import axios from "../../utils/axios";

export const postUser = ({first_name,last_name,email,password}) => {
    return dispatch => {
        return axios.post("/users",{
            first_name, last_name, email, password
        })
            .then(({ data }) => {
                dispatch(_postUser(data));
            }).catch(err => dispatch(_postUser(null,err)));
    };
}
