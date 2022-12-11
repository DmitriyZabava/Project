import axios from "axios";
import localStorageService from "./localStorage.service";

const httpAuth = axios.create({
    baseURL: "http://localhost:5000/api/auth/",
});

const authService = {
    signUp: async ({ email, password, username }) => {
        const { data } = await httpAuth.post("signUp", {
            email,
            password,
            username,
            returnSecureToken: true,
        });
        return data;
    },
    login: async ({ email, password }) => {
        const { data } = await httpAuth.post("login", {
            email,
            password,
            returnSecureToken: true,
        });
        return data;
    },
    refresh: async () => {
        const { data } = await httpAuth.post("token", {
            refreshToken: localStorageService.getRefreshToken(),
        });
        return data;
    },
};

export default authService;
