import {createSlice} from "@reduxjs/toolkit";
import isOutdated from "../utils/isOutdated";
import descriptionsService from "../service/descriptions.service";

const descriptionsSlice = createSlice({
    name: "descriptions",
    initialState: {
        entities: [],
        isLoading: true,
        error: null,
        lastFetch: null,
        dataLoaded: false
    },
    reducers: {
        descriptionsRequested: (state, action) => {
            state.isLoading = true;
        },
        descriptionsReceived: (state, action) => {
            state.entities = action.payload;
            state.lastFetch = Date.now();
            state.isLoading = false;
            state.dataLoaded = true;
        },
        descriptionsRequestedFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
    }
});
const {reducer: descriptionsReducer, actions} = descriptionsSlice;
const {descriptionsRequested, descriptionsReceived, descriptionsRequestedFailed} = actions;

export const loadDescriptions = () => async (dispatch, getState) => {
    const {lastFetch} = getState().descriptions;
    if(isOutdated(lastFetch)) {
        dispatch(descriptionsRequested());
        try {
            const data = await descriptionsService.fetchAll();
            dispatch(descriptionsReceived(data));
        } catch(error) {
            dispatch(descriptionsRequestedFailed(error.message));
        }
    }
};
export const getDescriptions = () => (state) => state.descriptions.entities;
export const getDescriptionsDataStatus = () => (state) => state.descriptions.dataLoaded;

export default descriptionsReducer;