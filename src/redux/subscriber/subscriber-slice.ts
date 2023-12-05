import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface ISubscriberState {
    payload: any;
    getAllSubscriberResponse: any;
    addSubscriberResponse: any;
    editSubscriberResponse: any;
    deleteSubscriberResponse: any;
    getSubscriberResponse: any;
    addNasWhitelistResponse: any;
    editNasWhitelistResponse: any;
    deleteNasWhitelistResponse: any;
    getAllNasWhitelistResponse: any;
    getNasWhitelistResponse: any;
    error: any;
}

const initialState: ISubscriberState = {
    payload: null,
    getAllSubscriberResponse: null,
    addSubscriberResponse: null,
    editSubscriberResponse: null,
    deleteSubscriberResponse: null,
    getSubscriberResponse: null,
    addNasWhitelistResponse: null,
    editNasWhitelistResponse: null,
    deleteNasWhitelistResponse: null,
    getAllNasWhitelistResponse: null,
    getNasWhitelistResponse: null,
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
        addNasWhitelist: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        addNasWhitelistSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            addNasWhitelistResponse: action.payload,
            error: null
        }),
        editNasWhitelist: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        editNasWhitelistSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            editNasWhitelistResponse: action.payload,
            error: null
        }),
        deleteNasWhitelist: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        deleteNasWhitelistSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            deleteNasWhitelistResponse: action.payload,
            error: null
        }),
        getAllNasWhitelist: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getAllNasWhitelistSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            getAllNasWhitelistResponse: action.payload,
            error: null
        }),
        getNasWhitelist: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getNasWhitelistSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            getNasWhitelistResponse: action.payload,
            error: null
        }),
        onClearHistory: (state) => ({
            ...state,
            getAllSubscriberResponse: null,
            addSubscriberResponse: null,
            editSubscriberResponse: null,
            deleteSubscriberResponse: null,
            getSubscriberResponse: null,
            addNasWhitelistResponse: null,
            editNasWhitelistResponse: null,
            deleteNasWhitelistResponse: null,
            getAllNasWhitelistResponse: null,
            getNasWhitelistResponse: null,
            error: null
        }),
        getError: (state) => ({
            ...state,
            error: null
        })
    }
})

export const {
    addNasWhitelist,
    addNasWhitelistSuccess,
    editNasWhitelist,
    editNasWhitelistSuccess,
    deleteNasWhitelist,
    deleteNasWhitelistSuccess,
    getAllNasWhitelist,
    getAllNasWhitelistSuccess,
    getNasWhitelist,
    getNasWhitelistSuccess,
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
