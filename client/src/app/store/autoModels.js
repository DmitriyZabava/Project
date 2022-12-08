import {createSlice} from "@reduxjs/toolkit";
import autoModelsService from "../service/autoModels.service";


const autoModelsSlice = createSlice({
    name: "autoModels",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        autoModelsRequested: (state) => {
            state.isLoading = true;
        }, autoModelsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        autoModelsRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }

});
const {reducer: autoModelsReducer, actions} = autoModelsSlice;
const {autoModelsRequested, autoModelsReceived, autoModelsRequestedFailed} = actions;

function isOutdated(date) {
    if(Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return Date.now() - date > 10 * 60 * 1000;
}

export const loadAutoModelsList = () => async (dispatch, getState) => {
    const {lastFetch} = getState().autoModels;
    if(isOutdated(lastFetch)) {
        dispatch(autoModelsRequested());
        try {
            const data = await autoModelsService.fetchAll();
            dispatch(autoModelsReceived(data));
        } catch(error) {
            dispatch(autoModelsRequestedFailed(error.message));
        }
    }
};
export const getAutoModels = () => (state) => state.autoModels.entities;

export const getAutoModelsLoadStatus = () => (state) => state.autoModels.isLoading;

export const getAutoModelById = (autoModelId) => (state) => {
    if(state.autoModels.entities) {
        return state.autoModels.entities.find((model) => model.id === autoModelId);
    }
};

export default autoModelsReducer;