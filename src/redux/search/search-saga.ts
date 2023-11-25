import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {SEARCH_AVP_RECORDS_API} from "./search-api";
import {getError, search, searchSuccess} from "./search-slice";
import {addAvpRecord} from "../avp/avp-slice";

function* handleSearch(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            SEARCH_AVP_RECORDS_API.all,
            action.payload
        );
        yield put(searchSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchSearch() {
    yield takeLatest<any>(search.type, handleSearch);
}

export default function* SearchSaga() {
    yield all([watchSearch()]);
}
