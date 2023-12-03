import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface ISubscriberState {
    payload: any;
    getAllSubscriberResponse: any;
    addSubscriberResponse: any;
    editSubscriberResponse: any;
    deleteSubscriberResponse: any;
    getSubscriberResponse: any;
    error: any;
}

const initialState: ISubscriberState = {
    payload: null,
    getAllSubscriberResponse: null,
    addSubscriberResponse: null,
    editSubscriberResponse: null,
    deleteSubscriberResponse: null,
    getSubscriberResponse: null,
    error: null
}

export const SubscriberSlice = createSlice({
    name: 'subscriber',
    initialState,
    reducers: {
        addSubscriber: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        addSubscriberSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            addSubscriberResponse: action.payload,
            error: null
        }),
        deleteSubscriber: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        deleteSubscriberSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            deleteSubscriberResponse: action.payload,
            error: null
        }),
        editSubscriber: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        editSubscriberSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            editSubscriberResponse: action.payload,
            error: null
        }),
        getAllSubscribers: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getAllSubscribersSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            getAllSubscriberResponse: action.payload,
            error: null
        }),
        getSubscriber: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getSubscribersSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            getSubscriberResponse: action.payload,
            error: null
        }),
        onClearHistory: (state) => ({
            ...state,
            getAllSubscriberResponse: null,
            addSubscriberResponse: null,
            editSubscriberResponse: null,
            deleteSubscriberResponse: null,
            getSubscriberResponse: null,
            error: null
        }),
        getError: (state) => ({
            ...state,
            error: null
        })
    }
})

export const {
    onClearHistory,
    getError,
    getSubscriber,
    getSubscribersSuccess,
    addSubscriber,
    addSubscriberSuccess,
    deleteSubscriber,
    deleteSubscriberSuccess,
    editSubscriber,
    editSubscriberSuccess,
    getAllSubscribers,
    getAllSubscribersSuccess


} = SubscriberSlice.actions

export default SubscriberSlice.reducer
