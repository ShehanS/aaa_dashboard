import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'


export interface IAVPState {
    payload: any;
    avpRecordAddResponse: any;
    avpRecordEditResponse: any;
    avpRecordDeleteResponse: any;
    avpRecordsResponse: any;
    error: any;
    avpRecordResponseSuccess: any;

}

const initialState: IAVPState = {
    payload: null,
    avpRecordAddResponse: null,
    avpRecordEditResponse: null,
    avpRecordDeleteResponse: null,
    avpRecordsResponse: null,
    error: null,
    avpRecordResponseSuccess: null
}

export const AVPSlice = createSlice({
    name: 'avp',
    initialState,
    reducers: {
        addAvpRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        editAvpRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        deleteAvpRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        addAvpRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            avpRecordAddResponse: action.payload,
            error: null
        }),
        editAvpRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            avpRecordEditResponse: action.payload,
            error: null
        }),
        deleteAvpRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            avpRecordDeleteResponse: action.payload,
            error: null
        }),
        getAllAvpRecords: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getAllAvpRecordsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            avpRecordsResponse: action.payload,
            error: null
        }),
        getAvpRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getAvpRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            avpRecordResponseSuccess: action.payload,
            error: null
        }),
        getError: (state) => ({
            ...state,
            error: null
        })

    }
})

export const {
    getAvpRecord,
    getAvpRecordSuccess,
    getError,
    addAvpRecord,
    editAvpRecord,
    deleteAvpRecord,
    addAvpRecordSuccess,
    editAvpRecordSuccess,
    deleteAvpRecordSuccess,
    getAllAvpRecords,
    getAllAvpRecordsSuccess

} = AVPSlice.actions
export default AVPSlice.reducer
