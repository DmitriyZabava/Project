import {createSlice} from "@reduxjs/toolkit";
import autoModelsService from "../service/autoModels.service";
import adminService from "../service/admin.service";


const autoModelsSlice = createSlice({
    name: "autoModels",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null,
        dataLoaded: false
    },
    reducers: {
        autoModelsRequested: (state) => {
            state.isLoading = true;
        },
        autoModelsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
            state.dataLoaded = true;
        },
        autoModelsRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        modelCreateReceived: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },
        modelRemoved: (state, action) => {
            state.entities = state.entities.filter(
                (comm) => comm._id !== action.payload
            );
            state.isLoading = false;
        },
        modelUpdated: (state, action) => {
        }
    }

});
const {reducer: autoModelsReducer, actions} = autoModelsSlice;
const {
    autoModelsRequested,
    autoModelsReceived,
    autoModelsRequestedFailed,
    modelCreateReceived,
    modelRemoved,
    modelUpdated
} = actions;

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

export const createModel = (payload) => async (dispatch) => {
    dispatch(autoModelsRequested());
    try {
        const data = await adminService.createModel(payload);
        console.log("storeData", data);
        dispatch(modelCreateReceived(data));
    } catch(error) {
        dispatch(autoModelsRequestedFailed(error.message));
    }
};

export const getAutoModels = () => (state) => state.autoModels.entities;

export const getAutoModelsLoadStatus = () => (state) => state.autoModels.isLoading;

export const getModelsDataStatus = () => (state) => state.autoModels.dataLoaded;

export const getAutoModelById = (autoModelId) => (state) => {
    if(state.autoModels.entities) {
        return state.autoModels.entities.find((model) => model.id === autoModelId);
    } else {
        return [];
    }
};
export const getModelsById = (modelsId) => (dispatch, getState) => {
    const {entities} = getState().autoModels;
    if(entities) {
        return modelsId.map((id) => entities.find((model) => model._id === id.modelId));

    }
};

export default autoModelsReducer;