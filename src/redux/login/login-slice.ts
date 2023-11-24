import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'


export interface LoginState {
    error: any;
    payload: any

}

const initialState: LoginState = {
    error: null,
    payload: null
}

export const LOGIN = 'login';


export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload
        }),
        loginSuccess: (state, action: PayloadAction<any>) => ({
            ...state,
            payload: action.payload
        }),
        loginError: (state, action: PayloadAction<any>) => ({
            ...state,
            error: action.payload
        })

    },
})

export const {login, loginSuccess, loginError} = loginSlice.actions
export default loginSlice.reducer
