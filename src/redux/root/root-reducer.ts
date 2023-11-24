import  loginReducer from "../login/login-slice";
import {combineReducers} from "@reduxjs/toolkit";
import counterReducer from "../login/counter-slice";
import AVPReducer from "../avp/avp-slice";

const rootReducer = combineReducers({
    counter: counterReducer,
    login: loginReducer,
    avp:AVPReducer
});

export default rootReducer;
