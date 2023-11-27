import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface INASState {
    payload: any;
    nasRecordAddResponse: any;
    nasRecordEditResponse: any;
    nasRecordDeleteResponse: any;
    nasRecordsResponse: any;
    error: any;
    nasRecordResponse: any;
    payloadAttr: any;
    attrAddResponse: any;
    attrEditResponse: any;
    attrDeleteResponse: any;
    attrGroupsResponse: any;
    subscribersResponse: any;
    subscribeAddResponse: any;
    subscriberEditResponse: any;
    subscriberDeleteResponse: any;
    payloadSubscriber: any;

}

const initialNASState: INASState = {
    payloadSubscriber: null,
    payload: null,
    nasRecordAddResponse: null,
    nasRecordEditResponse: null,
    nasRecordDeleteResponse: null,
    nasRecordsResponse: null,
    error: null,
    payloadAttr: null,
    nasRecordResponse: null,
    attrAddResponse: null,
    attrEditResponse: null,
    attrDeleteResponse: null,
    attrGroupsResponse: null,
    subscribersResponse: null,
    subscribeAddResponse: null,
    subscriberEditResponse: null,
    subscriberDeleteResponse: null
}

export const NASSlice = createSlice({
    name: 'nas',
    initialState: initialNASState,
    reducers: {
        addNASRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        editNASRecord: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        deleteNASRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        addNASRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            nasRecordAddResponse: action.payload,
            error: null
        }),
        editNASRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            nasRecordEditResponse: action.payload,
            error: null
        }),
        deleteNASRecordSuccess: (state, action: PayloadAction<any>) => ({
            nasRecordDeleteResponse: action.payload,
            error: null
        }),
        getAllNASRecords: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getAllNASRecordsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            nasRecordsResponse: action.payload,
            error: null
        }),
        getNASRecord: (state, action: PayloadAction<any>) => ({
            payload: action.payload,
            error: null
        }),
        getNASRecordSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            nasRecordResponse: action.payload,
            error: null
        }),
        addAttribute: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadAttr: action.payload,
            error: null,
        }),
        editAttribute: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadAttr: action.payload,
            error: null,
        }),
        deleteAttribute: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadAttr: action.payload,
            error: null,
        }),
        addAttributeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            attrAddResponse: action.payload,
            error: null,
        }),
        editAttributeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            attrEditResponse: action.payload,
            error: null,
        }),
        deleteAttributeSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            attrDeleteResponse: action.payload,
            error: null,
        }),
        getAllAttributeGroups: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadAttr: action.payload,
            error: null,
        }),
        getAllAttributeGroupsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            attrGroupsResponse: action.payload,
            error: null,
        }),
        addSubscriber: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null,
        }),
        editSubscriber: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null,
        }),
        deleteSubscriber: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null,
        }),
        addSubscriberSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            subscribeAddResponse: action.payload,
            error: null,
        }),
        editSubscriberSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            subscriberEditResponse: action.payload,
            error: null,
        }),
        deleteSubscriberSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            subscriberDeleteResponse: action.payload,
            error: null,
        }),
        getAllSubscribers: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null,
        }),
        getAllSubscribersSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            subscribersResponse: action.payload,
            error: null,
        }),

        getError: (state) => ({
            ...state,
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
    getAllNASRecordsSuccess,
    addAttribute,
    editAttribute,
    deleteAttribute,
    addAttributeSuccess,
    editAttributeSuccess,
    deleteAttributeSuccess,
    getAllAttributeGroups,
    getAllAttributeGroupsSuccess,
    addSubscriberSuccess,
    editSubscriberSuccess,
    addSubscriber,
    editSubscriber,
    deleteSubscriber,
    deleteSubscriberSuccess,
    getAllSubscribers,
    getAllSubscribersSuccess,
} = NASSlice.actions

export default NASSlice.reducer
