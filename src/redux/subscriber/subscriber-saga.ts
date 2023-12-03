import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    ADD_SUBSCRIBER_API,
    DELETE_SUBSCRIBER_API,
    EDIT_SUBSCRIBER_API,
    GET_ALL_SUBSCRIBER_API,
    GET_SUBSCRIBER_API,
} from "./subscriber-api";
import {
    addSubscriber,
    addSubscriberSuccess,
    deleteSubscriber,
    deleteSubscriberSuccess,
    editSubscriber,
    editSubscriberSuccess,
    getAllSubscribers,
    getAllSubscribersSuccess,
    getError,
    getSubscriber,
    getSubscribersSuccess
} from "./subscriber-slice";

function* handleGetSubscriber(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_SUBSCRIBER_API.get,
            action.payload
        );
        yield put(getSubscribersSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetAllSubscriber(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_ALL_SUBSCRIBER_API.all,
            action.payload
        );
        yield put(getAllSubscribersSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddSubscriber(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_SUBSCRIBER_API.add,
            action.payload
        );
        yield put(addSubscriberSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditSubscriber(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_SUBSCRIBER_API.edit,
            action.payload
        );
        yield put(editSubscriberSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteSubscriber(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_SUBSCRIBER_API.delete,
            action.payload
        );
        yield put(deleteSubscriberSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchDeleteSubscriber() {
    yield takeLatest<any>(deleteSubscriber.type, handleDeleteSubscriber);
}

function* watchEditSubscriber() {
    yield takeLatest<any>(editSubscriber.type, handleEditSubscriber);
}

function* watchAddSubscriber() {
    yield takeLatest<any>(addSubscriber.type, handleAddSubscriber);
}

function* watchGetSubscriber() {
    yield takeLatest<any>(getSubscriber.type, handleGetSubscriber);
}

function* watchGetAllSubscriber() {
    yield takeLatest<any>(getAllSubscribers.type, handleGetAllSubscriber);
}

export default function* SubscriberSaga() {
    yield all([watchGetSubscriber(), watchGetAllSubscriber(), watchAddSubscriber(), watchEditSubscriber(), watchDeleteSubscriber()]);
}
