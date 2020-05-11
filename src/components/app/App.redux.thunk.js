
import { getAuth as _getAuth} from "./App.redux.action";
import axios from "../../utils/axios";
import Cookies from "js-cookie";

export const getAuth = () => {
    return dispatch => {
        let token = Cookies.get("eazytask:token");
        let config = {
            headers: {
                Authorization: "Bearer " + token
            }
        }
        console.log({config})
        return axios.get("/auth",config)
            .then(({ data }) => {
                console.log(data, 7777, _getAuth(data))
                dispatch(_getAuth(data));
            }).catch(err => dispatch(_getAuth(null,err)));
    };
}
