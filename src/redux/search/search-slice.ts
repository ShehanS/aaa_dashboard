import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ISearchState {
    payloadSearch: any;
    searchResponse: any;
    error: any;

}

const initialState: ISearchState = {
    payloadSearch: null,
    searchResponse: null,
    error: null
}

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        search: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadSearch: action.payload,
            error: null
        }),
        searchSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            searchResponse: action.payload,
            error: null
        }),
        getError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload,
            searchResponse: null
        }),
        clearSearch: (state) => ({
            ...state,
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
