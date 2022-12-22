import {createAction, createSlice} from "@reduxjs/toolkit";

import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";
import {createUser, userLogOut} from "./user";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        isLoading: true,
        entities: null,
        error: null,
        isLoggedIn: false,

    },
    reducers: {
        authRequested: (state) => {
            state.error = null;
            state.isLoading = true;
        },
        authRequestSuccess: (state, action) => {
            state.entities = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authLogOut: (state) => {
            state.entities = null;
            state.isLoggedIn = false;
        }

    },
});
const {reducer: authReducer, actions} = authSlice;
const {authRequested, authRequestedFailed, authLogOut, authRequestSuccess} = actions;
const checkAuthRequested = createAction("auth/checkAuthRequested");


export const signUp =
    ({email, password, username, ...rest}) =>
        async (dispatch) => {
            dispatch(authRequested());

            try {
                const data = await authService.signUp({
                    email,
                    password,
                    username,
                });
                console.log("SignUpData", data);
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({userId: data.userId, role: data.role}));
                dispatch(createUser(data.userId));
            } catch(error) {
                dispatch(authRequestedFailed(error.message));
            }
        };

export const login = ({email, password}) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.login({email, password});
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({userId: data.userId, role: data.role}));
        dispatch(createUser(data.userId));
    } catch(error) {
        dispatch(authRequestedFailed(error.message));
    }
};

export const logOut = () => async (dispatch) => {
    try {
        await authService.logout();
        dispatch(authLogOut());
        dispatch(userLogOut());
    } catch(error) {
        return error.message;
    }


};

export const checkAuth = () => async (dispatch) => {
    dispatch(checkAuthRequested());
    try {
        const data = await authService.refresh();
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({userId: data.userId, role: data.role}));
        dispatch(createUser(data.userId));
    } catch(error) {
        dispatch(authRequestedFailed(error.message));

    }
};
export const getIsAuthLoadingStatus = () => (state) => state.auth.isLoading

export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;

export const getCurrentUserRole = () => (state) => state.auth.entities?.currentUser?.role;


export default authReducer;
