import createSagaMiddleware from 'redux-saga';
import LoginSaga from "../login/saga-login";
import AVPSaga from "../avp/avp-saga";
import SearchSaga from "../search/search-saga";
import AccountSaga from "../account/account_saga";

const sagaMiddleware = createSagaMiddleware();

export const runRootSagaMiddleware = () => {
    sagaMiddleware.run(LoginSaga);
    sagaMiddleware.run(AVPSaga);
    sagaMiddleware.run(SearchSaga);
    sagaMiddleware.run(AccountSaga);
};

export default sagaMiddleware;
