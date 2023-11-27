import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface INASState {
    payload: any;
    nasRecordAddResponse: any;
    nasRecordEditResponse: any;
    nasRecordDeleteResponse: any;
    nasRecordsResponse: any;
    error: any;
    nasRecordResponse: any;
}

const initialNASState: INASState = {
    payload: null,
    nasRecordAddResponse: null,
    nasRecordEditResponse: null,
    nasRecordDeleteResponse: null,
    nasRecordsResponse: null,
    error: null,
    nasRecordResponse: null
}

export const NASSlice = createSlice({
    name: 'nas',
    initialState: initialNASState,
    reducers: {
        addNASRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        editNASRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        deleteNASRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        addNASRecordSuccess: (state, action: PayloadAction<any>) => ({
            nasRecordAddResponse: action.payload,
            error: null
        }),
        editNASRecordSuccess: (state, action: PayloadAction<any>) => ({
            nasRecordEditResponse: action.payload,
            error: null
        }),
        deleteNASRecordSuccess: (state, action: PayloadAction<any>) => ({
            nasRecordDeleteResponse: action.payload,
            error: null
        }),
        getAllNASRecords: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getAllNASRecordsSuccess: (state, action: PayloadAction<any>) => ({
            nasRecordsResponse: action.payload,
            error: null
        }),
        getNASRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getNASRecordSuccess: (state, action: PayloadAction<any>) => ({
            nasRecordResponse: action.payload,
            error: null
        }),
        getError: (state) => ({
            error: null
        })
    }
})

export const {
    getNASRecord,
    getNASRecordSuccess,
    getError,
    addNASRecord,
    editNASRecord,
    deleteNASRecord,
    addNASRecordSuccess,
    editNASRecordSuccess,
    deleteNASRecordSuccess,
    getAllNASRecords,
    getAllNASRecordsSuccess
} = NASSlice.actions

export default NASSlice.reducer
