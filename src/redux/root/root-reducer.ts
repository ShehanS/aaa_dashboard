import loginReducer from "../login/login-slice";
import {combineReducers} from "@reduxjs/toolkit";
import counterReducer from "../login/counter-slice";
import AVPReducer from "../avp/avp-slice";
import SearchReducer from "../search/search-slice";
import AccountReducer from "../account/account-slice";
import COAReducer from  "../coa/coa-slice";
import NASReducer from "../nas/nas-slice"

const rootReducer = combineReducers({
    counter: counterReducer,
    login: loginReducer,
    avp: AVPReducer,
    search: SearchReducer,
    account: AccountReducer,
    coa:COAReducer,
    nas: NASReducer
});

export default rootReducer;
