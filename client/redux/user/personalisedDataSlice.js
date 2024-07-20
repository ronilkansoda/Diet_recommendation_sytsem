import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentData: null,
    loading: false,
    error: false,
};

const personalisedSlice = createSlice({
    name: "personalisedData",
    initialState,
    reducers: {
        personalisedDataFetchStart: (state) => {
            state.loading = true;
        },
        personalisedDataFetchSuccess: (state, action) => {
            state.currentData = action.payload;
            state.loading = false;
            state.error = false;
        },
        personalisedDataFetchFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        resetData: (state) => {
            return initialState;
        },
    }
});

export const { personalisedDataFetchStart, personalisedDataFetchSuccess, personalisedDataFetchFailure,resetData } = personalisedSlice.actions;

export default personalisedSlice.reducer;
