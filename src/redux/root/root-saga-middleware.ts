import createSagaMiddleware from 'redux-saga';
import LoginSaga from "../login/saga-login";
import AVPSaga from "../avp/avp-saga";

const sagaMiddleware = createSagaMiddleware();

export const runRootSagaMiddleware = () => {
    sagaMiddleware.run(LoginSaga);
    sagaMiddleware.run(AVPSaga);
};

export default sagaMiddleware;
