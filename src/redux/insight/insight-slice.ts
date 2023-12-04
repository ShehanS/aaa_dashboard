import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'

export interface IInsight {
    payload: any;
    insightResponse: any;

}

const initialState: IInsight = {
    payload: null,
    insightResponse: null
}

export const InsightSlice = createSlice({
    name: 'insight',
    initialState,
    reducers: {
        getInsight: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload,
            error: null
        }),
        getInsightSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            insightResponse: action.payload,
            error: null
        }),

        onClearHistory: (state) => ({
            ...state,
            insightResponse: null,
        }),

        getError: (state) => ({
            ...state,
            error: null
        })
    }
})

export const {
    getInsight,
    getInsightSuccess,
    getError
} = InsightSlice.actions

export default InsightSlice.reducer
