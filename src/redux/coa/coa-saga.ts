import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    ADD_COA_RECORD_API,
    DELETE_COA_RECORD_API,
    EDIT_COA_RECORD_API,
    GET_COA_RECORD_API,
    GET_COA_RECORDS_API
} from "./coa-api";
import {
    addCOARecord,
    addCOARecordSuccess,
    deleteCOARecord,
    deleteCOARecordSuccess,
    editCOARecord,
    editCOARecordSuccess,
    getAllCOARecords,
    getAllCOARecordsSuccess,
    getCOAError,
    getCOARecord,
    getCOARecordSuccess
} from "./coa-slice";

function* handleGetCOARecords(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_COA_RECORD_API.all,
            action.payload
        );
        yield put(getCOARecordSuccess(response));
    } catch (e) {
        yield put(getCOAError(e));
    }
}

function* handleGetAllCOARecords(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_COA_RECORDS_API.all,
            action.payload
        );
        yield put(getAllCOARecordsSuccess(response));
    } catch (e) {
        yield put(getCOAError(e));
    }
}

function* handleAddCOARecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_COA_RECORD_API.add,
            action.payload
        );
        yield put(addCOARecordSuccess(response));
    } catch (e) {
        yield put(getCOAError(e));
    }
}

function* handleEditCOARecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_COA_RECORD_API.edit,
            action.payload
        );
        yield put(editCOARecordSuccess(response));
    } catch (e) {
        yield put(getCOAError(e));
    }
}

function* handleDeleteCOARecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_COA_RECORD_API.delete,
            action.payload
        );
        yield put(deleteCOARecordSuccess(response));
    } catch (e) {
        yield put(getCOAError(e));
    }
}

function* watchDeleteCOARecord() {
    yield takeLatest<any>(deleteCOARecord.type, handleDeleteCOARecord);
}

function* watchEditCOARecord() {
    yield takeLatest<any>(editCOARecord.type, handleEditCOARecord);
}

function* watchAddingCOARecord() {
    yield takeLatest<any>(addCOARecord.type, handleAddCOARecord);
}

function* watchGetCOAAllRecords() {
    yield takeLatest<any>(getAllCOARecords.type, handleGetAllCOARecords);
}

function* watchGetCOARecord() {
    yield takeLatest<any>(getCOARecord.type, handleGetCOARecords);
}

export default function* COASaga() {
    yield all([
        watchAddingCOARecord(),
        watchGetCOAAllRecords(),
        watchGetCOARecord(),
        watchEditCOARecord(),
        watchDeleteCOARecord()
    ]);
}
