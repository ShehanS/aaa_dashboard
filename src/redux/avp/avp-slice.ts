import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'


export interface IAVPState {
    payload: any;
    avpRecordAddResponse: any;
    avpRecordEditResponse: any;
    avpRecordDeleteResponse: any;
    avpRecordsResponse: any;
    error: any;

}

const initialState: IAVPState = {
    payload: null,
    avpRecordAddResponse: null,
    avpRecordEditResponse: null,
    avpRecordDeleteResponse: null,
    avpRecordsResponse: null,
    error: null
}

export const AVPSlice = createSlice({
    name: 'avp',
    initialState,
    reducers: {
        addAvpRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        editAvpRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        deleteAvpRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        addAvpRecordSuccess: (state, action: PayloadAction<any>) => ({
            avpRecordAddResponse: action.payload,
            error: null
        }),
        editAvpRecordSuccess: (state, action: PayloadAction<any>) => ({
            avpRecordEditResponse: action.payload,
            error: null
        }),
        deleteAvpRecordSuccess: (state, action: PayloadAction<any>) => ({
            avpRecordDeleteResponse: action.payload,
            error: null
        }),
        getAllAvpRecords: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getAllAvpRecordsSuccess: (state, action: PayloadAction<any>) => ({
            avpRecordsResponse: action.payload,
            error: null
        }),
        getError: (state) => ({
            error: null
        })

    }
})

export const {
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
