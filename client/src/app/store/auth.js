import {createAction, createSlice} from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";
import userService from "../service/user.service";


const authSlice = createSlice({
    name: "auth",
    initialState: {
        entities: null,
        isLoading: true,
        currentUser: null,
        error: null,
        auth: null,
        isLoggetIn: false,

    },
    reducers: {
        authRequestSuccess: (state, action) => {
            state.auth = action.payload;
            state.isLoggetIn = true;
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
        userCreated: (state, action) => {
            state.currentUser = action.payload;
        }
    },
});
const {reducer: authReducer, actions} = authSlice;
const {authRequested, authRequestedFailed, authRequestSuccess, userCreated} = actions;
const userCreateRequested = createAction("auth/userCreateRequested");

function createUser(id) {
    return async function(dispatch) {
        dispatch(userCreateRequested());
        try {
            const content = await userService.get(id);
            console.log("Content", content);
            dispatch(userCreated(content));
        } catch(error) {

        }
    };
};
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
                dispatch(authRequestSuccess({user: data.user}));
                dispatch(createUser(data.user._id));
            } catch(error) {
                dispatch(authRequestedFailed(error.message));
            }
        };

export const login = ({email, password}) => async (dispatch) => {
    dispatch(authRequested());
    try {
        const data = await authService.login({email, password});
        console.log("Logindata", data);
        localStorageService.setTokens(data);
        dispatch(authRequestSuccess({user: data.user}));
        dispatch(createUser(data.user._id));
    } catch(error) {
        dispatch(authRequestedFailed(error.message));
    }
};

export const getIsLoggetIn = () => (state) => state.auth.isLoggetIn;

export const getCurrentUserRole = () => (state) => state.auth.currentUser?.role;


export default authReducer;
