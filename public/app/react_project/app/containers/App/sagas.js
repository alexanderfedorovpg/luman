import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    LOAD_EDITORS,

    groups
} from './constants'

import {
    LOGIN
} from 'containers/LoginPage/constants'

import {
    editorsLoaded,
    editorsLoadingError
} from './actions'

import {
    loginSuccess,
    loginError
} from 'containers/LoginPage/actions'

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

function* loginWatcher() {
    yield takeLatest(LOGIN, login);
}

function* fetchEditors() {
    try {
        let { data: editors } = yield call(api.getUsersInGroup, groups.editor);

        yield put(editorsLoaded(editors));
    } catch (err) {
        yield put(editorsLoadingError(err));
    }
}

function* usersData() {
    yield takeLatest(LOAD_EDITORS, fetchEditors);
}

export default [
    loginWatcher,
    usersData
]
