import { combineReducers, configureStore } from "@reduxjs/toolkit";

import authReducer from "./auth";
import autoBrandReducer from "./autoBrand";
import autoModelsReducer from "./autoModels";

const rootReducer = combineReducers({
    autoBrand: autoBrandReducer,
    autoModels: autoModelsReducer,
    auth: authReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
