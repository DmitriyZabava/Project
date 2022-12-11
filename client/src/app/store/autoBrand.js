import {createSlice} from "@reduxjs/toolkit";
import autoBrandService from "../service/autoBrand.service";


const autoBrandSlice = createSlice({
    name: "autoBrand",
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null,
    },
    reducers: {
        autoBrandRequested: (state) => {
            state.isLoading = true;
        },
        autoBrandReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
        },
        autoBrandRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    },
});

const {reducer: autoBrandReducer, actions} = autoBrandSlice;
const {autoBrandRequested, autoBrandReceived, autoBrandRequestedFailed} =
    actions;

function isOutdated(date) {
    if(Date.now() - date > 10 * 60 * 1000) {
        return true;
    }
    return Date.now() - date > 10 * 60 * 1000;

}

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

export const getAutoBrandById = (autoBrandId) => (state) => {
    if(state.autoBrand.entities) {
        return state.autoBrand.entities.find(
            (brand) => brand.id === autoBrandId
        );
    }
};

export default autoBrandReducer;
