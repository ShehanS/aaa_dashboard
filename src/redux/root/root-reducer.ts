import loginReducer from "../login/login-slice";
import {combineReducers} from "@reduxjs/toolkit";
import counterReducer from "../login/counter-slice";
import AVPReducer from "../avp/avp-slice";
import SearchReducer from "../search/search-slice";

const rootReducer = combineReducers({
    counter: counterReducer,
    login: loginReducer,
    avp: AVPReducer,
    search: SearchReducer
});

export default rootReducer;
