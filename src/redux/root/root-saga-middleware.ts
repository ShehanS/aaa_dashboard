import createSagaMiddleware from 'redux-saga';
import LoginSaga from "../login/saga-login";
import AVPSaga from "../avp/avp-saga";
import SearchSaga from "../search/search-saga";
import AccountSaga from "../account/account_saga";
import COASaga from "../coa/coa-saga";
import NASSaga from "../nas/nas-saga";
import ParameterSaga from "../parameter/parameter-saga";
import PlanSaga from "../plan/plan-saga";
import DMSaga from "../dm/dm-saga";
import SubscriberSaga from "../subscriber/subscriber-saga";

const sagaMiddleware = createSagaMiddleware();

export const runRootSagaMiddleware = () => {
    sagaMiddleware.run(LoginSaga);
    sagaMiddleware.run(AVPSaga);
    sagaMiddleware.run(SearchSaga);
    sagaMiddleware.run(AccountSaga);
    sagaMiddleware.run(COASaga);
    sagaMiddleware.run(DMSaga);
    sagaMiddleware.run(NASSaga);
    sagaMiddleware.run(ParameterSaga);
    sagaMiddleware.run(PlanSaga);
    sagaMiddleware.run(SubscriberSaga);

};

export default sagaMiddleware;
