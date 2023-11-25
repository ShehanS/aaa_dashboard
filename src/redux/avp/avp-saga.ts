import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {ADD_AVP_RECORD_API, EDIT_AVP_RECORD_API, GET_AVP_RECORD_API, GET_AVP_RECORDS_API} from "./avp-api";
import {
    addAvpRecord,
    addAvpRecordSuccess, editAvpRecord, editAvpRecordSuccess,
    getAllAvpRecords,
    getAllAvpRecordsSuccess,
    getAvpRecord,
    getAvpRecordSuccess,
    getError
} from "./avp-slice";


function* handleGetAvpRecords(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_AVP_RECORD_API.all,
            action.payload
        );
        yield put(getAvpRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetAllAvpRecords(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_AVP_RECORDS_API.all,
            action.payload
        );
        yield put(getAllAvpRecordsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddAvpRecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_AVP_RECORD_API.add,
            action.payload
        );
        yield put(addAvpRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditAvpRecord(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_AVP_RECORD_API.edit,
            action.payload
        );
        yield put(editAvpRecordSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchEditAvpRecord() {
    yield takeLatest<any>(editAvpRecord.type, handleEditAvpRecord);
}
function* watchAddingAvpRecord() {
    yield takeLatest<any>(addAvpRecord.type, handleAddAvpRecord);
}

function* watchGetAvpAllRecords() {
    yield takeLatest<any>(getAllAvpRecords.type, handleGetAllAvpRecords);
}

function* watchGetAvpRecord() {
    yield takeLatest<any>(getAvpRecord.type, handleGetAvpRecords);
}

export default function* TaskSaga() {
    yield all([watchAddingAvpRecord(), watchGetAvpAllRecords(), watchGetAvpRecord(), watchEditAvpRecord()]);
}
