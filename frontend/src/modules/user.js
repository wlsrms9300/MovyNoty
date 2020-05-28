import createRequestSaga, { createRequestActionTypes } from "../lib/createRequestSaga";
import { handleActions, createAction } from "redux-actions";
import * as authAPI from '../lib/api/auth';
import {takeLatest,call} from 'redux-saga/effects';

const TEMP_SET_USER = 'user/TEMP_SET_USER';//새로고침 해도 로그인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createRequestActionTypes(
    'user/CHECK'
);
const LOGOUT = 'user/LOGOUT';

export const tempSetUser = createAction(TEMP_SET_USER, user=> user);
export const check = createAction(CHECK);
export const logout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFialureSaga(){
    try {
        localStorage.removeItem('user');
    } catch (error) {
        console.log('no working ');
    }
}

export function* userSaga(){
    yield takeLatest(CHECK, checkSaga);
    yield takeLatest(CHECK_FAILURE, checkFialureSaga);
    yield takeLatest(LOGOUT, logoutSaga);
}
export function* logoutSaga(){
    try {
        yield call(authAPI.logout);
        localStorage.removeItem('user');
    } catch (error) {
        console.log(error);
    }
}

const initialSate={
    user: null,
    checkError: null
}

export default handleActions(
    {
        [TEMP_SET_USER]: (state, {payload:user})=>({
            ...state,
            user
        }),
        [CHECK_SUCCESS]: (state,{payload:user})=>({
            ...state,
            user,
            checkError:null
        }),
        [CHECK_FAILURE]: (state,{payload:error})=>({
            ...state,
            user: null,
            checkError: error
        }),
        [LOGOUT] : (state)=>({
            ...state,
            user: null
        })
    },
    initialSate
)