import {all, call, put, takeLatest} from "redux-saga/effects";
import {ServerResponse} from "http";
import {ADD_ACCOUNT_API, DELETE_ACCOUNT_API, EDIT_ACCOUNT_API, GET_ACCOUNT_API, GET_ACCOUNTS_API} from "./account_api";
import {
    addAccount,
    addAccountSuccess,
    deleteAccount,
    deleteAccountSuccess,
    editAccount,
    editAccountSuccess,
    getAccount,
    getAccountSuccess,
    getAllAccounts,
    getAllAccountsSuccess,
    getError
} from "./account-slice";

function* handleGetAccounts(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_ACCOUNT_API.get,
            action.payload
        );
        yield put(getAccountSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}


function* handleGetAllAccounts(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            GET_ACCOUNTS_API.all,
            action.payload
        );
        yield put(getAllAccountsSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleAddAccount(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            ADD_ACCOUNT_API.add,
            action.payload
        );
        yield put(addAccountSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleEditAccount(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            EDIT_ACCOUNT_API.edit,
            action.payload
        );
        yield put(editAccountSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* handleDeleteAccount(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            DELETE_ACCOUNT_API.delete,
            action.payload
        );
        yield put(deleteAccountSuccess(response));
    } catch (e) {
        yield put(getError(e));
    }
}

function* watchDeleteAccount() {
    yield takeLatest<any>(deleteAccount.type, handleDeleteAccount);
}

function* watchEditAccount() {
    yield takeLatest<any>(editAccount.type, handleEditAccount);
}

function* watchAddingAccount() {
    yield takeLatest<any>(addAccount.type, handleAddAccount);
}

function* watchGetAllAccounts() {
    yield takeLatest<any>(getAllAccounts.type, handleGetAllAccounts);
}

function* watchGetAccount() {
    yield takeLatest<any>(getAccount.type, handleGetAccounts);
}

export default function* AccountSaga() {
    yield all([
        watchAddingAccount(),
        watchGetAllAccounts(),
        watchGetAccount(),
        watchEditAccount(),
        watchDeleteAccount()
    ]);
}
