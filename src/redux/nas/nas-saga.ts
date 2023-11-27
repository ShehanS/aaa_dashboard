import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    ADD_NAS_RECORD_API,
    DELETE_NAS_RECORD_API,
    EDIT_NAS_RECORD_API,
    GET_NAS_RECORD_API,
    GET_NAS_RECORDS_API
} from "./nas-api";
import {
    addNASRecord,
    addNASRecordSuccess,
    deleteNASRecord,
    deleteNASRecordSuccess,
    editNASRecord,
    editNASRecordSuccess,
    getAllNASRecords,
    getAllNASRecordsSuccess,
    getError,
    getNASRecord,
    getNASRecordSuccess
} from "./nas-slice";

function* handleGetNASRecords(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_NAS_RECORD_API.all,
            action.payload
        );
        yield put(getNASRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetAllNASRecords(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_NAS_RECORDS_API.all,
            action.payload
        );
        yield put(getAllNASRecordsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddNASRecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_NAS_RECORD_API.add,
            action.payload
        );
        yield put(addNASRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditNASRecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_NAS_RECORD_API.edit,
            action.payload
        );
        yield put(editNASRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteNASRecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_NAS_RECORD_API.delete,
            action.payload
        );
        yield put(deleteNASRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchDeleteNASRecord() {
    yield takeLatest<any>(deleteNASRecord.type, handleDeleteNASRecord);
}

function* watchEditNASRecord() {
    yield takeLatest<any>(editNASRecord.type, handleEditNASRecord);
}

function* watchAddingNASRecord() {
    yield takeLatest<any>(addNASRecord.type, handleAddNASRecord);
}

function* watchGetNASAllRecords() {
    yield takeLatest<any>(getAllNASRecords.type, handleGetAllNASRecords);
}

function* watchGetNASRecord() {
    yield takeLatest<any>(getNASRecord.type, handleGetNASRecords);
}

export default function* NASSaga() {
    yield all([
        watchAddingNASRecord(),
        watchGetNASAllRecords(),
        watchGetNASRecord(),
        watchEditNASRecord(),
        watchDeleteNASRecord()
    ]);
}
