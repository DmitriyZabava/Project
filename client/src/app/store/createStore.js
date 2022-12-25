import {combineReducers, configureStore} from "@reduxjs/toolkit";

import authReducer from "./auth";
import autoBrandReducer from "./autoBrand";
import autoModelsReducer from "./autoModels";
import userReducer from "./user";
import descriptionsReducer from "./descriptions";

const rootReducer = combineReducers({
    autoBrand: autoBrandReducer,
    autoModels: autoModelsReducer,
    auth: authReducer,
    user: userReducer,
    descriptions: descriptionsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
