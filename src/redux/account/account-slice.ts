import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface IAccountState {
    payload: any;
    accountAddResponse: any;
    accountEditResponse: any;
    accountDeleteResponse: any;
    accountRecordsResponse: any;
    accountRecordResponse: any;
    error: any;
}

const initialState: IAccountState = {
    payload: null,
    accountAddResponse: null,
    accountEditResponse: null,
    accountDeleteResponse: null,
    accountRecordsResponse: null,
    accountRecordResponse: null,
    error: null,
}

export const AccountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        addAccount: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        editAccount: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        deleteAccount: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        addAccountSuccess: (state, action: PayloadAction<any>) => ({
            accountAddResponse: action.payload,
            error: null
        }),
        editAccountSuccess: (state, action: PayloadAction<any>) => ({
            accountEditResponse: action.payload,
            error: null
        }),
        deleteAccountSuccess: (state, action: PayloadAction<any>) => ({
            accountDeleteResponse: action.payload,
            error: null
        }),
        getAllAccounts: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getAllAccountsSuccess: (state, action: PayloadAction<any>) => ({
            accountRecordsResponse: action.payload,
            error: null
        }),
        getAccount: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getAccountSuccess: (state, action: PayloadAction<any>) => ({
            accountRecordResponse: action.payload,
            error: null
        }),
        getError: (state) => ({
            error: null
        })
    }
})

export const {
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
