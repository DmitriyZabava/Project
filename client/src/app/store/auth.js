import {createAction, createSlice} from "@reduxjs/toolkit";

import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";
import {createUser} from "./user";
import adminService from "../service/admin.service";
import generateAuthError from "../utils/generateAuthError";


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
        },
        createModeratorRequested: (state) => {
            state.error = null;
            state.isLoading = true;
        },
        createModeratorRequestSuccess: (state, action) => {
            state.entities = action.payload;
            state.isLoggedIn = true;
            state.isLoading = false;
        },
        createModeratorRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },

    },
});
const {reducer: authReducer, actions} = authSlice;
const {
    authRequested,
    authRequestedFailed,
    authLogOut,
    authRequestSuccess,
    createModeratorRequested,
    createModeratorRequestSuccess,
    createModeratorRequestedFailed
} = actions;
const checkAuthRequested = createAction("auth/checkAuthRequested");


export const signUp =
    ({email, password, username}) =>
        async (dispatch) => {
            dispatch(authRequested());

            try {
                const data = await authService.signUp({
                    email,
                    password,
                    username,
                });
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({userId: data.userId, role: data.role}));
                dispatch(createUser(data.userId));
            } catch(error) {
                const {code, message} = error.response.data.error;
                if(code === 400) {
                    const errorMessage = generateAuthError(message);
                    dispatch(authRequestedFailed(errorMessage));
                } else {
                    dispatch(authRequestedFailed(error.message));
                }
            }
        };

export const createModerator = ({email, password, username}) => async (dispatch) => {
    dispatch(createModeratorRequested());
    try {
        await adminService.createModerator({email, password, username});
    } catch(error) {
        dispatch(createModeratorRequestedFailed(error.message));

    }
};

export const login =
    ({email, password}) =>
        async (dispatch) => {
            dispatch(authRequested());
            try {
                const data = await authService.login({email, password});
                localStorageService.setTokens(data);
                dispatch(authRequestSuccess({userId: data.userId, role: data.role}));
                dispatch(createUser(data.userId));
            } catch(error) {
                const {code, message} = error.response.data.error;
                if(code === 400) {
                    const errorMessage = generateAuthError(message);
                    dispatch(authRequestedFailed(errorMessage));
                } else {
                    dispatch(authRequestedFailed(error.message));
                }
            }
        };

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(authLogOut());

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


export const getIsLoggedIn = () => (state) => state.auth.isLoggedIn;
export const getAuthError = () => (state) => state.auth.error;


export default authReducer;
