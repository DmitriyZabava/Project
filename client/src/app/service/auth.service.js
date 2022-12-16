import localStorageService from "./localStorage.service";
import httpServices from "./http.service";

const authService = {
    signUp: async ({email, password, username}) => {
        const {data} = await httpServices.post("auth/signUp", {
            email,
            password,
            username,
            returnSecureToken: true,
        });
        return data;
    },
    login: async ({email, password}) => {
        const {data} = await httpServices.post("auth/login", {
            email,
            password,
            returnSecureToken: true,
        });
        return data;
    },
    refresh: async () => {
        const {data} = await httpServices.post("auth/token", {
            refreshToken: localStorageService.getRefreshToken(),
        });
        return data;
    },
};

export default authService;
