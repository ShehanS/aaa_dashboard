import  loginReducer from "../login/login-slice";
import {combineReducers} from "@reduxjs/toolkit";
import counterReducer from "../login/counter-slice";


const rootReducer = combineReducers({
    counter: counterReducer,
    login: loginReducer
});

export default rootReducer;
