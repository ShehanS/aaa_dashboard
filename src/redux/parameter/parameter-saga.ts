import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";

import {
    ADD_META_PARAMS_API,
    ADD_SQL_PARAMS_API,
    DELETE_META_PARAMS_API,
    DELETE_SQL_PARAMS_API,
    EDIT_META_PARAMS_API,
    EDIT_SQL_PARAMS_API,
    GET_METE_ALL_PARMS_API, GET_SQL_PARAMS_API
} from "./parameter-api";
import {
    addMetaParams,
    addMetaParamsSuccess,
    addSqlParams,
    addSqlParamsSuccess,
    deleteMetaParams,
    deleteMetaParamsSuccess,
    deleteSqlParams,
    deleteSqlParamsSuccess,
    editMetaParams,
    editMetaParamsSuccess,
    editSqlParams,
    editSqlParamsSuccess,
    getError,
    getMetaParams,
    getMetaParamsSuccess,
    getSqlParams,
    getSqlParamsSuccess
} from "./parameter-slice";

function* handleEditMetaParam(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_META_PARAMS_API.edit,
            action.payload
        );
        yield put(editMetaParamsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteMetaParam(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_META_PARAMS_API.delete,
            action.payload
        );
        yield put(deleteMetaParamsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddMetaParam(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_META_PARAMS_API.add,
            action.payload
        );
        yield put(addMetaParamsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* handleGetMetaParams(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_METE_ALL_PARMS_API.all,
            action.payload
        );
        yield put(getMetaParamsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* handleEditSqlParam(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_SQL_PARAMS_API.edit,
            action.payload
        );
        yield put(editSqlParamsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteSqlParam(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_SQL_PARAMS_API.delete,
            action.payload
        );
        yield put(deleteSqlParamsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddSqlParam(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_SQL_PARAMS_API.add,
            action.payload
        );
        yield put(addSqlParamsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* handleGetSqlParams(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SQL_PARAMS_API.all,
            action.payload
        );
        yield put(getSqlParamsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchMetaParamAdd() {
    yield takeLatest<any>(addMetaParams.type, handleAddMetaParam);
}

function* watchMetaParamEdit() {
    yield takeLatest<any>(editMetaParams.type, handleEditMetaParam);
}

function* watchMetaParamDelete() {
    yield takeLatest<any>(deleteMetaParams.type, handleDeleteMetaParam);
}

function* watchMetaAllParamsDelete() {
    yield takeLatest<any>(getMetaParams.type, handleGetMetaParams);
}


function* watchSqlParamAdd() {
    yield takeLatest<any>(addSqlParams.type, handleAddSqlParam);
}

function* watchSqlParamEdit() {
    yield takeLatest<any>(editSqlParams.type, handleEditSqlParam);
}

function* watchSqlParamDelete() {
    yield takeLatest<any>(deleteSqlParams.type, handleDeleteSqlParam);
}

function* watchSqlAllParamsDelete() {
    yield takeLatest<any>(getSqlParams.type, handleGetSqlParams);
}


export default function* ParameterSaga() {
    yield all([watchMetaParamAdd(), watchMetaParamEdit(), watchMetaParamDelete(), watchMetaAllParamsDelete(), watchSqlParamAdd(), watchSqlParamEdit(), watchSqlParamDelete(), watchSqlAllParamsDelete()]);
}
