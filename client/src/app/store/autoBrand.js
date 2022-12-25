import {createSlice} from "@reduxjs/toolkit";
import autoBrandService from "../service/autoBrand.service";
import isOutdated from "../utils/isOutdated";
import adminService from "../service/admin.service";

const autoBrandSlice = createSlice({
    name: "autoBrand",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
        dataLoaded: false
    },
    reducers: {
        autoBrandRequested: (state) => {
            state.isLoading = true;
        },
        autoBrandReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
            state.dataLoaded = true;
        },
        autoBrandRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createBrandReceived: (state, action) => {
            state.entities.push(action.payload);
            state.isLoading = false;
        },

    },
});

const {reducer: autoBrandReducer, actions} = autoBrandSlice;
const {autoBrandRequested, autoBrandReceived, autoBrandRequestedFailed, createBrandReceived} =
    actions;


export const loadAutoBrandList = () => async (dispatch, getState) => {
    const {lastFetch} = getState().autoBrand;
    if(isOutdated(lastFetch)) {
        dispatch(autoBrandRequested());
        try {
            const data = await autoBrandService.fetchAll();
            dispatch(autoBrandReceived(data));
        } catch(error) {
            dispatch(autoBrandRequestedFailed(error.message));
        }
    }
};
export const getaAtoBrand = () => (state) => state.autoBrand.entities;

export const getAutoBrandLoadStatus = () => (state) =>
    state.autoBrand.isLoading;

export const getBrandDataStatus = () => (state) => state.autoBrand.dataLoaded;

export const createBrand = (payload) => async (dispatch) => {
    dispatch(autoBrandRequested());

    try {
        const data = await adminService.createBrand(payload);
        dispatch(createBrandReceived(data));
    } catch(error) {
        dispatch(autoBrandRequestedFailed(error.message));

    }
};
export const getAutoBrandById = (autoBrandId) => (state) => {
    if(state.autoBrand.entities) {
        return state.autoBrand.entities.find(
            (brand) => brand.id === autoBrandId
        );
    }
};

export default autoBrandReducer;
