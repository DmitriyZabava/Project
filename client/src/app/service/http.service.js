import axios from "axios";
import configFile from "../config.json";
import {toast} from "react-toastify";

const http = axios.create({baseURL: configFile.apiEndPoint});

http.interceptors.response.use(
    (res) => res,
    function(error) {
        const expectedErrors =
            error.response &&
            error.response.status >= 400 &&
            error.response.status < 500;

        if(!expectedErrors) {
            toast.error(error.message);
        }
        return Promise.reject(error);
    }
);

const httpServices = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch,
};
export default httpServices;
