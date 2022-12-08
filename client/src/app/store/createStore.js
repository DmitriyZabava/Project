import {combineReducers, configureStore} from "@reduxjs/toolkit";

import autoBrandReducer from "./autoBrand";
import autoModelsReducer from "./autoModels";

const rootReducer = combineReducers({
    autoBrand: autoBrandReducer,
    autoModels: autoModelsReducer,

});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
