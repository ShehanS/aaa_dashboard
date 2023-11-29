import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    ADD_PLAN_ATTRIBUTE_API,
    ADD_PLAN_TYPE_API,
    DELETE_PLAN_TYPES_API,
    EDIT_PLAN_TYPES_API,
    GET_PLAN_ATTRIBUTES_API,
    GET_PLAN_TYPES_API
} from "./plan-api";
import {
    addPlanAttribute,
    addPlanAttributeSuccess,
    addPlanType,
    addPlanTypeSuccess,
    deletePlanType,
    deletePlanTypeSuccess,
    editPlanType,
    editPlanTypeSuccess,
    getError,
    getPlansAttribute,
    getPlansAttributeSuccess,
    getPlansType,
    getPlansTypeSuccess
} from "./plan-slice";


function* handleAddPlanType(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_PLAN_TYPE_API.add,
            action.payload
        );
        yield put(addPlanTypeSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetPlanTypes(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_PLAN_TYPES_API.get,
            action.payload
        );
        yield put(getPlansTypeSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeletePlanTypes(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_PLAN_TYPES_API.delete,
            action.payload
        );
        yield put(deletePlanTypeSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditPlanTypes(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_PLAN_TYPES_API.edit,
            action.payload
        );
        yield put(editPlanTypeSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* handleGetPlanAttributes(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_PLAN_ATTRIBUTES_API.get,
            action.payload
        );
        yield put(getPlansAttributeSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddAttribute(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_PLAN_ATTRIBUTE_API.add,
            action.payload
        );
        yield put(addPlanAttributeSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchEditPlanType() {
    yield takeLatest<any>(editPlanType.type, handleEditPlanTypes);
}

function* watchDeletePlanType() {
    yield takeLatest<any>(deletePlanType.type, handleDeletePlanTypes);
}

function* watchAddPlanType() {
    yield takeLatest<any>(addPlanType.type, handleAddPlanType);
}

function* watchGetPlanTypes() {
    yield takeLatest<any>(getPlansType.type, handleGetPlanTypes);
}

function* watchGetPlanAttributes() {
    yield takeLatest<any>(getPlansAttribute.type, handleGetPlanAttributes);
}

function* watchAddPlanAttribute() {
    yield takeLatest<any>(addPlanAttribute.type, handleAddAttribute);
}


export default function* PlanSaga() {
    yield all([watchAddPlanType(), watchEditPlanType(), watchGetPlanTypes(), watchDeletePlanType(), watchGetPlanAttributes(), watchAddPlanAttribute()]);
}
