import axios from "axios";
import configFile from "../config.json";
import {toast} from "react-toastify";
import localStorageService from "./localStorage.service";
import authService from "./auth.service";

const http = axios.create({
    baseURL: configFile.apiEndPoint
});

http.interceptors.request.use(async function(config) {
    config.headers.Authorization = `Bearer ${localStorageService.getAccessToken()}`;
    const expiresDate = localStorageService.getExpiresDate();
    const refreshToken = localStorageService.getRefreshToken();
    const isExpired = refreshToken && expiresDate < Date.now();
    if(isExpired) {
        const data = await authService.refresh();
        localStorageService.setTokens(data);
    }
    const accessToken = localStorageService.getAccessToken();
    if(accessToken) {
        config.params = {...config.params, Authorization: `Bearer ${accessToken}`};
    }
    return config;
});


http.interceptors.response.use(
    (res) => res,
    async function(error) {
        try {
            const expectedErrors =
                error.response &&
                error.response.status >= 400 &&
                error.response.status < 500;

            if(!expectedErrors) {
                toast.error(error.message);
            }
            return Promise.reject(error);
        } catch(error) {
            return error.message;

        }


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
