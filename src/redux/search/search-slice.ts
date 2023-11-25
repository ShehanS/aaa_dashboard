import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ISearchState {
    payload: any;
    searchResponse: any;
    error: any;

}

const initialState: ISearchState = {
    payload: null,
    searchResponse: null,
    error: null
}

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        searchSuccess: (state, action: PayloadAction<any>) => ({
            searchResponse: action.payload,
            error: null
        }),
        getError: (state, action: PayloadAction<any>) => ({
            error: action.payload,
            searchResponse: null
        }),
        clearSearch: (state, action: PayloadAction<any>) => ({
            searchResponse: null,
            error: null
        }),
    }
});

export const {
    search,
    searchSuccess,
    getError,
    clearSearch
} = SearchSlice.actions
export default SearchSlice.reducer
