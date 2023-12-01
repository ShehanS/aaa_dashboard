import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface ICOAState {
    payload: any;
    coaRecordAddResponse: any;
    coaRecordEditResponse: any;
    coaRecordDeleteResponse: any;
    coaRecordsResponse: any;
    error: any;
    coaRecordResponse: any;
}

const initialState: ICOAState = {
    payload: null,
    coaRecordAddResponse: null,
    coaRecordEditResponse: null,
    coaRecordDeleteResponse: null,
    coaRecordsResponse: null,
    error: null,
    coaRecordResponse: null
}

export const COASlice = createSlice({
    name: 'coa',
    initialState,
    reducers: {
        addCOARecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        editCOARecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        deleteCOARecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        addCOARecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            coaRecordAddResponse: action.payload,
            error: null
        }),
        editCOARecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            coaRecordEditResponse: action.payload,
            error: null
        }),
        deleteCOARecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            coaRecordDeleteResponse: action.payload,
            error: null
        }),
        getAllCOARecords: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getAllCOARecordsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            coaRecordsResponse: action.payload,
            error: null
        }),
        getCOARecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getCOARecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            coaRecordResponse: action.payload,
            error: null
        }),
        onClearHistory: (state) => ({
            ...state,
            coaRecordAddResponse: null,
            coaRecordEditResponse: null,
            coaRecordDeleteResponse: null,
        }),
        getCOAError: (state) => ({
            ...state,
            error: null
        })
    }
})

export const {
    onClearHistory,
    getCOARecord,
    getCOARecordSuccess,
    getCOAError,
    addCOARecord,
    editCOARecord,
    deleteCOARecord,
    addCOARecordSuccess,
    editCOARecordSuccess,
    deleteCOARecordSuccess,
    getAllCOARecords,
    getAllCOARecordsSuccess
} = COASlice.actions

export default COASlice.reducer
