import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    LOGIN,
    LOGOUT
} from './constants'

import {
    loginSuccess,
    loginError
} from './actions'

import * as api from 'api'

function* login({ payload }) {

    try {
        let { data: { api_token } } = yield call(api.login, {
            ...payload
        });

        api.setToken(api_token)

        yield put(loginSuccess(api_token));
    } catch (err) {
        yield put(loginError(err));
    }
}

function* logout() {
    api.setToken(undefined)
}

function* loginWatcher() {
    yield take(LOGIN, login);

    yield take(LOGOUT, logout);
}

export default [
    loginWatcher
]
