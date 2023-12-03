import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface IDMState {
    payload: any;
    dmRecordAddResponse: any;
    dmRecordEditResponse: any;
    dmRecordDeleteResponse: any;
    dmRecordsResponse: any;
    error: any;
    dmRecordResponse: any;
}

const initialState: IDMState = {
    payload: null,
    dmRecordAddResponse: null,
    dmRecordEditResponse: null,
    dmRecordDeleteResponse: null,
    dmRecordsResponse: null,
    error: null,
    dmRecordResponse: null
}

export const DMSlice = createSlice({
    name: 'dm',
    initialState,
    reducers: {
        addDMRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        editDMRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        deleteDMRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        addDMRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            dmRecordAddResponse: action.payload,
            error: null
        }),
        editDMRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            dmRecordEditResponse: action.payload,
            error: null
        }),
        deleteDMRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            dmRecordDeleteResponse: action.payload,
            error: null
        }),
        getAllDMRecords: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getAllDMRecordsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            dmRecordsResponse: action.payload,
            error: null
        }),
        getDMRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getDMRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            dmRecordResponse: action.payload,
            error: null
        }),
        onClearHistory: (state) => ({
            ...state,
            dmRecordAddResponse: null,
            dmRecordEditResponse: null,
            dmRecordDeleteResponse: null,
        }),
        getError: (state) => ({
            ...state,
            error: null
        })
    }
})

export const {
    onClearHistory,
    getDMRecord,
    getDMRecordSuccess,
    getError,
    addDMRecord,
    editDMRecord,
    deleteDMRecord,
    addDMRecordSuccess,
    editDMRecordSuccess,
    deleteDMRecordSuccess,
    getAllDMRecords,
    getAllDMRecordsSuccess
} = DMSlice.actions

export default DMSlice.reducer
