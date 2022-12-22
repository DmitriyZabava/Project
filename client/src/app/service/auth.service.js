import localStorageService from "./localStorage.service";
import httpServices from "./http.service";
import axios from "axios";

import configFile from "../config.json";

const authEndpoint = configFile.apiEndPoint + "auth/";
const httpAuth = axios.create({
    baseURL: authEndpoint
});


const authService = {
    signUp: async ({email, password, username}) => {
        const {data} = await httpAuth.post("signUp", {
            email,
            password,
            username
        });
        return data;
    },
    login: async ({email, password}) => {
        const {data} = await httpServices.post(authEndpoint + "login", {
            email,
            password
        });
        return data;
    },
    refresh: async () => {
        const {data} = await httpAuth.post("token",
            {refreshToken: localStorageService.getRefreshToken()});
        return data;
    },
    logout: async () => {
        const {data} = await httpAuth.post("logout");
        localStorageService.removeAuthData();
        return data;
    }
};

export default authService;
