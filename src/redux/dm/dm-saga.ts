import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    ADD_DM_RECORD_API,
    DELETE_DM_RECORD_API,
    EDIT_DM_RECORD_API,
    GET_DM_RECORD_API,
    GET_DM_RECORDS_API
} from "./dm-api";
import {
    getDMRecord,
    getDMRecordSuccess,
    getError,
    addDMRecord,
    editDMRecord,
    deleteDMRecord,
    addDMRecordSuccess,
    editDMRecordSuccess,
    deleteDMRecordSuccess,
    getAllDMRecords,
    getAllDMRecordsSuccess
} from "./dm-slice";

function* handleGetDMRecords(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_DM_RECORD_API.all,
            action.payload
        );
        yield put(getDMRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetAllDMRecords(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_DM_RECORDS_API.all,
            action.payload
        );
        yield put(getAllDMRecordsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddDMRecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_DM_RECORD_API.add,
            action.payload
        );
        yield put(addDMRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditDMRecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_DM_RECORD_API.edit,
            action.payload
        );
        yield put(editDMRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteDMRecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_DM_RECORD_API.delete,
            action.payload
        );
        yield put(deleteDMRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchDeleteDMRecord() {
    yield takeLatest<any>(deleteDMRecord.type, handleDeleteDMRecord);
}

function* watchEditDMRecord() {
    yield takeLatest<any>(editDMRecord.type, handleEditDMRecord);
}

function* watchAddingDMRecord() {
    yield takeLatest<any>(addDMRecord.type, handleAddDMRecord);
}

function* watchGetDMAllRecords() {
    yield takeLatest<any>(getAllDMRecords.type, handleGetAllDMRecords);
}

function* watchGetDMRecord() {
    yield takeLatest<any>(getDMRecord.type, handleGetDMRecords);
}

export default function* DMSaga() {
    yield all([
        watchAddingDMRecord(),
        watchGetDMAllRecords(),
        watchGetDMRecord(),
        watchEditDMRecord(),
        watchDeleteDMRecord()
    ]);
}
