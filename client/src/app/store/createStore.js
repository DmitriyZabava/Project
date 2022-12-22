import {combineReducers, configureStore} from "@reduxjs/toolkit";

import authReducer from "./auth";
import autoBrandReducer from "./autoBrand";
import autoModelsReducer from "./autoModels";
import userReducer from "./user";

const rootReducer = combineReducers({
    autoBrand: autoBrandReducer,
    autoModels: autoModelsReducer,
    auth: authReducer,
    user: userReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
