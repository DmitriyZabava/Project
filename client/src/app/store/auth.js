import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        auth: null,
        isLoggetIn: false,
    },
    reducers: {
        authRequestSuccess: (state, action) => {
            state.auth = { ...action.payload, isLoggetIn: true };
        },
        authReceived: (state, action) => {
            state.entities = action.payload;
            state.isLoading = false;
        },
        authRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        authRequested: (state) => {
            state.error = null;
        },
    },
});
const { reducer: authReducer, actions } = authSlice;
const { authRequested, authRequestedFailed, authRequestSuccess } = actions;

export const signUp =
    ({ email, password, username, ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            const data = await authService.signUp({
                email,
                password,
                username,
            });
            console.log("sigUpdata", data);
            localStorageService.setTokens(data);
            dispatch(authRequestSuccess({ userId: data.localId }));
        } catch (error) {
            dispatch(authRequestedFailed(error.message));
        }
    };

export const login = (email, password) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.login({ email, password });
        console.log("Logindata", data);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess());
    } catch (error) {
        dispatch(authRequestedFailed(error.message));
    }
};

export default authReducer;
