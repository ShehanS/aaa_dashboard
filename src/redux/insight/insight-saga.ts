import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {GET_INSIGHT_TOTAL_DOWNLOAD} from "./insight-api";
import {getError, getInsight, getInsightSuccess} from "./insight-slice";

function* handleGetInsight(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_INSIGHT_TOTAL_DOWNLOAD.get,
            action.payload
        );
        yield put(getInsightSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* watchTotalDownload() {
    yield takeLatest<any>(getInsight.type, handleGetInsight);
}


export default function* InsightSaga() {
    yield all([

        watchTotalDownload()
    ]);
}
