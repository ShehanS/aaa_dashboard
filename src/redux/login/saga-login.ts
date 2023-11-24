import { all, call, put, takeLatest, take } from "redux-saga/effects";
import {login, loginError, loginSuccess} from "./login-slice";
import {USER_LOGIN_API} from "./login-api";
import {ServerResponse} from "http";


function* handleUserLogin(action: { payload: {} }) {
    try {
        const response: ServerResponse = yield call(
            USER_LOGIN_API.login,
            action.payload
        );
        yield put(loginSuccess(response));
    } catch (e) {
        yield put(loginError(e));
    }
}

function* watchUserLogin() {
    yield takeLatest<any>(login.type, handleUserLogin);
}

export default function* LoginSaga() {
    yield all([watchUserLogin()]);
}
