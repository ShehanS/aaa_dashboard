import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    addNasWhitelist,
    addNasWhitelistSuccess,
    addSubscriber,
    addSubscriberParameter,
    addSubscriberParameterSuccess,
    addSubscriberPlan,
    addSubscriberPlanSuccess,
    addSubscriberSuccess,
    deleteNasWhitelist,
    deleteNasWhitelistSuccess,
    deleteSubscriber,
    deleteSubscriberParameter,
    deleteSubscriberParameterSuccess,
    deleteSubscriberPlan,
    deleteSubscriberPlanSuccess,
    deleteSubscriberSuccess,
    editNasWhitelist,
    editNasWhitelistSuccess,
    editSubscriber,
    editSubscriberSuccess,
    getAllNasWhitelist,
    getAllNasWhitelistSuccess,
    getAllSubscriberParameter,
    getAllSubscriberParameterSuccess,
    getAllSubscriberPlan,
    getAllSubscriberPlanSuccess,
    getAllSubscribers,
    getAllSubscribersSuccess,
    getError,
    getNasWhitelist,
    getNasWhitelistSuccess,
    getSubscriber,
    getSubscribersSuccess
} from "./subscriber-slice";
import {
    ADD_NAS_WHITELIST_LIST_API,
    ADD_PARAMETER_API,
    ADD_SUBSCRIBER_API,
    ADD_SUBSCRIBER_PLAN_API,
    DELETE_NAS_WHITELIST_LIST_API,
    DELETE_PARAMETER_API,
    DELETE_SUBSCRIBER_API,
    DELETE_SUBSCRIBER_PLAN_API,
    EDIT_NAS_WHITELIST_LIST_API,
    EDIT_SUBSCRIBER_API,
    GET_ALL_NAS_WHITELIST_LIST_API,
    GET_ALL_PARAMETER_API,
    GET_ALL_SUBSCRIBER_API,
    GET_ALL_SUBSCRIBER_PLAN_API,
    GET_NAS_WHITELIST_LIST_API,
    GET_SUBSCRIBER_API,
} from "./subscriber-api";


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

function* handleAddNasWhitelist(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_NAS_WHITELIST_LIST_API.add,
            action.payload
        );
        yield put(addNasWhitelistSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetAllNasWhitelist(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_ALL_NAS_WHITELIST_LIST_API.get,
            action.payload
        );
        yield put(getAllNasWhitelistSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* handleEditNasWhitelist(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_NAS_WHITELIST_LIST_API.edit,
            action.payload
        );
        yield put(editNasWhitelistSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleNasWhitelist(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_NAS_WHITELIST_LIST_API.get,
            action.payload
        );
        yield put(getNasWhitelistSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteNasWhitelist(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_NAS_WHITELIST_LIST_API.delete,
            action.payload
        );
        yield put(deleteNasWhitelistSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* handleAddParameter(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_PARAMETER_API.add,
            action.payload
        );
        yield put(addSubscriberParameterSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteParameter(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_PARAMETER_API.delete,
            action.payload
        );
        yield put(deleteSubscriberParameterSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetAllParameter(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_ALL_PARAMETER_API.get,
            action.payload
        );
        yield put(getAllSubscriberParameterSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


//////////////////////////////////////


function* handleAddSubscriberPlan(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_SUBSCRIBER_PLAN_API.add,
            action.payload
        );
        yield put(addSubscriberPlanSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteSubscriberPlan(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_SUBSCRIBER_PLAN_API.delete,
            action.payload
        );
        yield put(deleteSubscriberPlanSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetAllSubscriberPlan(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_ALL_SUBSCRIBER_PLAN_API.get,
            action.payload
        );
        yield put(getAllSubscriberPlanSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchAddSubscriberPlan() {
    yield takeLatest<any>(addSubscriberPlan.type, handleAddSubscriberPlan);
}

function* watchDeleteSubscriberPlan() {
    yield takeLatest<any>(deleteSubscriberPlan.type, handleDeleteSubscriberPlan);
}

function* watchGetAllSubscriberPlans() {
    yield takeLatest<any>(getAllSubscriberPlan.type, handleGetAllSubscriberPlan);
}

function* watchAddParameter() {
    yield takeLatest<any>(addSubscriberParameter.type, handleAddParameter);
}

function* watchDeleteParameter() {
    yield takeLatest<any>(deleteSubscriberParameter.type, handleDeleteParameter);
}

function* watchGetAllParameters() {
    yield takeLatest<any>(getAllSubscriberParameter.type, handleGetAllParameter);
}


function* watchGetNasWhitelist() {
    yield takeLatest<any>(getNasWhitelist.type, handleNasWhitelist);
}

function* watchDeleteNasWhitelist() {
    yield takeLatest<any>(deleteNasWhitelist.type, handleDeleteNasWhitelist);
}

function* watchEditNasWhitelist() {
    yield takeLatest<any>(editNasWhitelist.type, handleEditNasWhitelist);
}


function* watchGetAllNasWhitelist() {
    yield takeLatest<any>(getAllNasWhitelist.type, handleGetAllNasWhitelist);
}

function* watchAddNasWhitelist() {
    yield takeLatest<any>(addNasWhitelist.type, handleAddNasWhitelist);
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
    yield all([watchAddSubscriberPlan(), watchDeleteSubscriberPlan(), watchGetAllSubscriberPlans(), watchAddParameter(), watchDeleteParameter(), watchGetAllParameters(), watchGetNasWhitelist(), watchDeleteNasWhitelist(), watchEditNasWhitelist(), watchGetAllNasWhitelist(), watchAddNasWhitelist(), watchGetSubscriber(), watchGetAllSubscriber(), watchAddSubscriber(), watchEditSubscriber(), watchDeleteSubscriber()]);
}
