import {createSlice} from "@reduxjs/toolkit";
import autoModelsService from "../service/autoModels.service";
import adminService from "../service/admin.service";
import isOutdated from "../utils/isOutdated";


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
export const getModelsByIdForBasket = (modelsId) => (dispatch, getState) => {
    const {entities} = getState().autoModels;
    if(entities) {
        return modelsId.map((id) => {
            const data = entities.find((model) => model._id === id.modelId);
            const {quantity, cost} = id;
            const {name, _id, image, price, discount, isAvailable, brand, id: model} = data;
            return ( {_id, name, isAvailable, image, price, discount, quantity, cost, brand, model} );
        });
    }
};

export default autoModelsReducer;