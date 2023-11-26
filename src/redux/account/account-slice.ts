import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAccountState {
    payload: any;
    accountAddResponse: any;
    accountEditResponse: any;
    accountDeleteResponse: any;
    accountRecordsResponse: any;
    accountRecordResponse: any;
    filterAddResponse: any;
    filterEditResponse: any;
    filterDeleteResponse: any;
    filtersResponse: any;
    filterPayload: any;
    error: any;
}

const initialState: IAccountState = {
    payload: null,
    accountAddResponse: null,
    accountEditResponse: null,
    accountDeleteResponse: null,
    accountRecordsResponse: null,
    accountRecordResponse: null,
    filterAddResponse: null,
    filterEditResponse: null,
    filterDeleteResponse: null,
    filtersResponse: null,
    error: null,
    filterPayload: null,
}

export const AccountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        editAccount: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        deleteAccount: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        addAccountSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            accountAddResponse: action.payload,
            error: null
        }),
        editAccountSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            accountEditResponse: action.payload,
            error: null
        }),
        deleteAccountSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            accountDeleteResponse: action.payload,
            error: null
        }),
        getAllAccounts: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getAllAccountsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            accountRecordsResponse: action.payload,
            error: null
        }),
        getAccount: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getAccountSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            accountRecordResponse: action.payload,
            error: null
        }),

        addFilter: (state, action: PayloadAction<any>) => ({
            ...state,
            filterPayload: action.payload,
            error: null
        }),
        addFilterSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            filterAddResponse: action.payload,
            error: null
        }),
        editFilter: (state, action: PayloadAction<any>) => ({
            ...state,
            filterPayload: action.payload,
            error: null
        }),
        editFilterSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            filterEditResponse: action.payload,
            error: null
        }),
        deleteFilter: (state, action: PayloadAction<any>) => ({
            ...state,
            filterPayload: action.payload,
            error: null
        }),
        deleteFilterSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            filterDeleteResponse: action.payload,
            error: null
        }),

        getAllFilters: (state, action: PayloadAction<any>) => ({
            ...state,
            filterPayload: action.payload,
            error: null
        }),
        getAllFiltersSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            filtersResponse: action.payload,
            error: null
        }),

        getError: (state) => ({
            ...state,
            error: null
        })
    }
})

export const {
    getAllFilters,
    getAllFiltersSuccess,
    addFilter,
    addFilterSuccess,
    editFilter,
    editFilterSuccess,
    deleteFilter,
    deleteFilterSuccess,
    getAccount,
    getAccountSuccess,
    getError,
    addAccount,
    editAccount,
    deleteAccount,
    addAccountSuccess,
    editAccountSuccess,
    deleteAccountSuccess,
    getAllAccounts,
    getAllAccountsSuccess
} = AccountSlice.actions

export default AccountSlice.reducer
