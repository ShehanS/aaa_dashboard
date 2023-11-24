import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {ADD_AVP_RECORD_API, GET_AVP_RECORDS_API} from "./avp-api";
import {addAvpRecord, addAvpRecordSuccess, getAllAvpRecords, getAllAvpRecordsSuccess, getError} from "./avp-slice";


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

function* watchAddingAvpRecord() {
    yield takeLatest<any>(addAvpRecord.type, handleAddAvpRecord);
}

function* watchGetAvpAllRecord() {
    yield takeLatest<any>(getAllAvpRecords.type, handleGetAllAvpRecords);
}

export default function* TaskSaga() {
    yield all([watchAddingAvpRecord(), watchGetAvpAllRecord()]);
}
