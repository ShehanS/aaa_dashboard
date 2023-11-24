import createSagaMiddleware from 'redux-saga';
import LoginSaga from "../login/saga-login";

const sagaMiddleware = createSagaMiddleware();

export const runRootSagaMiddleware = () => {
    sagaMiddleware.run(LoginSaga);
};

export default sagaMiddleware;
