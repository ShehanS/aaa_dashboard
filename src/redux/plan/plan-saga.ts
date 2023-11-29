import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {
    ADD_PLAN_API,
    ADD_PLAN_ATTRIBUTE_API,
    ADD_PLAN_PARAMETER_API,
    ADD_PLAN_TYPE_API,
    DELETE_PLAN_API,
    DELETE_PLAN_ATTRIBUTE_API,
    DELETE_PLAN_PARAMETER_API,
    DELETE_PLAN_TYPES_API,
    EDIT_PLAN_API,
    EDIT_PLAN_ATTRIBUTE_API,
    EDIT_PLAN_PARAMETER_API,
    EDIT_PLAN_TYPES_API,
    GET_ALL_PLAN_API,
    GET_ALL_PLAN_PARAMETER_API,
    GET_PLAN_ATTRIBUTES_API,
    GET_PLAN_TYPES_API
} from "./plan-api";
import {
    addPlan,
    addPlanAttribute,
    addPlanAttributeSuccess,
    addPlanParameter,
    addPlanParameterSuccess,
    addPlanSuccess,
    addPlanType,
    addPlanTypeSuccess,
    deletePlan,
    deletePlanAttribute,
    deletePlanAttributeSuccess,
    deletePlanParameter,
    deletePlanParameterSuccess,
    deletePlanSuccess,
    deletePlanType,
    deletePlanTypeSuccess,
    editPlan,
    editPlanAttribute,
    editPlanAttributeSuccess,
    editPlanParameter,
    editPlanParameterSuccess,
    editPlanSuccess,
    editPlanType,
    editPlanTypeSuccess,
    getError,
    getPlans,
    getPlansAttribute,
    getPlansAttributeSuccess,
    getPlansParameter,
    getPlansParameterSuccess,
    getPlansType,
    getPlansTypeSuccess,
    getPlanSuccess
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

function* handleDeleteAttribute(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_PLAN_ATTRIBUTE_API.delete,
            action.payload
        );
        yield put(deletePlanAttributeSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditPlanAttribute(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_PLAN_ATTRIBUTE_API.edit,
            action.payload
        );
        yield put(editPlanAttributeSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddPlanParameter(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_PLAN_PARAMETER_API.add,
            action.payload
        );
        yield put(addPlanParameterSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditPlanParameter(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_PLAN_PARAMETER_API.edit,
            action.payload
        );
        yield put(editPlanParameterSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetPlanParameters(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_ALL_PLAN_PARAMETER_API.get,
            action.payload
        );
        yield put(getPlansParameterSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeletePlanParameters(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_PLAN_PARAMETER_API.delete,
            action.payload
        );
        yield put(deletePlanParameterSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


//
function* handleAddPlan(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_PLAN_API.add,
            action.payload
        );
        yield put(addPlanSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditPlan(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_PLAN_API.edit,
            action.payload
        );
        yield put(editPlanSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleGetPlans(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_ALL_PLAN_API.get,
            action.payload
        );
        yield put(getPlanSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeletePlan(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_PLAN_API.delete,
            action.payload
        );
        yield put(deletePlanSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchEditPlanAttributes() {
    yield takeLatest<any>(editPlanAttribute.type, handleEditPlanAttribute);
}


function* watchDeletePlanAttributes() {
    yield takeLatest<any>(deletePlanAttribute.type, handleDeleteAttribute);
}

function* watchAddPlan() {
    yield takeLatest<any>(addPlan.type, handleAddPlan);
}

function* watchEditPlan() {
    yield takeLatest<any>(editPlan.type, handleEditPlan);
}

function* watchDeletePlan() {
    yield takeLatest<any>(deletePlan.type, handleDeletePlan);
}

function* watchGetPlans() {
    yield takeLatest<any>(getPlans.type, handleGetPlans);
}


function* watchDeletePlanParameter() {
    yield takeLatest<any>(deletePlanParameter.type, handleDeletePlanParameters);
}

function* watchGetPlanParameters() {
    yield takeLatest<any>(getPlansParameter.type, handleGetPlanParameters);
}


function* watchEditPlanParameter() {
    yield takeLatest<any>(editPlanParameter.type, handleEditPlanParameter);
}


function* watchAddPlanParameter() {
    yield takeLatest<any>(addPlanParameter.type, handleAddPlanParameter);
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
    yield all([watchAddPlan(), watchEditPlanAttributes(), watchDeletePlanAttributes(), watchEditPlan(), watchDeletePlan(), watchGetPlans(), watchDeletePlanParameter(), watchGetPlanParameters(), watchEditPlanParameter(), watchAddPlanParameter(), watchAddPlanType(), watchEditPlanType(), watchGetPlanTypes(), watchDeletePlanType(), watchGetPlanAttributes(), watchAddPlanAttribute()]);
}
