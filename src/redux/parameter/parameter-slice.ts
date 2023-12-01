import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface ParamsState {
    payloadMetaParams: any;
    payloadSqlParams: any;
    metaParameterAddResponse: any,
    metaParameterEditResponse: any,
    metaParameterDeleteResponse: any,
    sqlParameterAddResponse: any,
    sqlParameterEditResponse: any,
    sqlParameterDeleteResponse: any,
    sqlParametersGetResponse: any,
    error: any;
    metaParamsGetResponse: any;
    metaParamGetResponse: any;
}

const initialState: ParamsState = {
    payloadMetaParams: null,
    payloadSqlParams: null,
    metaParameterAddResponse: null,
    metaParameterEditResponse: null,
    metaParameterDeleteResponse: null,
    sqlParameterAddResponse: null,
    sqlParameterEditResponse: null,
    sqlParameterDeleteResponse: null,
    sqlParametersGetResponse: null,
    error: null,
    metaParamsGetResponse: null,
    metaParamGetResponse: null,
}

export const ParameterSlice = createSlice({
    name: 'parameter',
    initialState,
    reducers: {
        addMetaParams: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadMetaParams: action.payload,
            error: null
        }),
        editMetaParams: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadMetaParams: action.payload,
            error: null
        }),
        deleteMetaParams: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadMetaParams: action.payload,
            error: null
        }),
        addMetaParamsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            metaParameterAddResponse: action.payload,
            error: null
        }),
        editMetaParamsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            metaParameterEditResponse: action.payload,
            error: null
        }),
        deleteMetaParamsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            metaParameterDeleteResponse: action.payload,
            error: null
        }),
        getMetaParam: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadMetaParams: action.payload,
            error: null
        }),
        getMetaParams: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadMetaParams: action.payload,
            error: null
        }),
        getMetaParamsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            metaParamsGetResponse: action.payload,
        }),
        getMetaParamSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            metaParamGetResponse: action.payload,
            error: null
        }),

        addSqlParams: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadSqlParams: action.payload,
            error: null
        }),
        editSqlParams: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadSqlParams: action.payload,
            error: null
        }),
        deleteSqlParams: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadSqlParams: action.payload,
            error: null
        }),
        addSqlParamsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            sqlParameterAddResponse: action.payload,
            error: null
        }),
        editSqlParamsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            sqlParameterEditResponse: action.payload,
            error: null
        }),
        deleteSqlParamsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            sqlParameterDeleteResponse: action.payload,
            error: null
        }),
        getSqlParams: (state, action: PayloadAction<any>) => ({
            ...state,
            payloadSqlParams: action.payload,
            error: null
        }),
        getSqlParamsSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            sqlParametersGetResponse: action.payload,
            error: null
        }),

        onClearHistory: (state) => ({
            ...state,
            metaParameterAddResponse: null,
            metaParameterEditResponse: null,
            metaParameterDeleteResponse: null,
            sqlParameterAddResponse: null,
            sqlParameterEditResponse: null,
            sqlParameterDeleteResponse: null,
        }),

        getError: (state) => ({
            ...state,
            error: null
        })
    }
})

export const {
    getMetaParam,
    getMetaParamSuccess,
    getSqlParams,
    addSqlParams,
    editSqlParams,
    deleteSqlParams,
    addSqlParamsSuccess,
    editSqlParamsSuccess,
    deleteSqlParamsSuccess,
    getSqlParamsSuccess,
    addMetaParams,
    editMetaParams,
    deleteMetaParams,
    addMetaParamsSuccess,
    editMetaParamsSuccess,
    deleteMetaParamsSuccess,
    getMetaParams,
    getMetaParamsSuccess,
    getError

} = ParameterSlice.actions

export default ParameterSlice.reducer
