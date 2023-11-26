import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ICOAState {
    payload: any;
    coaRecordAddResponse: any;
    coaRecordEditResponse: any;
    coaRecordDeleteResponse: any;
    coaRecordsResponse: any;
    error: any;
    coaRecordResponse: any;
}

const initialCOAState: ICOAState = {
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
    initialState: initialCOAState,
    reducers: {
        addCOARecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        editCOARecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        deleteCOARecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        addCOARecordSuccess: (state, action: PayloadAction<any>) => ({
            coaRecordAddResponse: action.payload,
            error: null
        }),
        editCOARecordSuccess: (state, action: PayloadAction<any>) => ({
            coaRecordEditResponse: action.payload,
            error: null
        }),
        deleteCOARecordSuccess: (state, action: PayloadAction<any>) => ({
            coaRecordDeleteResponse: action.payload,
            error: null
        }),
        getAllCOARecords: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getAllCOARecordsSuccess: (state, action: PayloadAction<any>) => ({
            coaRecordsResponse: action.payload,
            error: null
        }),
        getCOARecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getCOARecordSuccess: (state, action: PayloadAction<any>) => ({
            coaRecordResponse: action.payload,
            error: null
        }),
        getCOAError: (state) => ({
            error: null
        })
    }
})

export const {
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
