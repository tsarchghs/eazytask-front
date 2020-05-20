import axios from "axios";

let baseURL = "http://localhost:4000/api/v1";       
// let baseURL = "https://app.swaggerhub.com/apis/gjergjk71/easytask/1.0.0-oas3";
// let baseURL = "http://eazytask-back.herokuapp.com/api/v1"

const instance = axios.create({
    baseURL: baseURL
});

instance.defaults.headers.post['Content-Type'] = 'application/json';

export default instance;