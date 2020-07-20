import axios from "axios";
import { baseURL } from "../configs"

const instance = axios.create({
    baseURL: baseURL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

instance.interceptors.request.use(
    config => {
        const token = localStorage.getItem("eazytask:token");
        console.log("tokentokentokentoken",token)
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

export default instance;