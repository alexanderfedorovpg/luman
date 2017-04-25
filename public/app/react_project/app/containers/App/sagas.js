import { take, call, put, select, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    LOAD_EDITORS,
    LOAD_USERS,
    LOAD_CURRENT_USER,
    LOAD_RUBRICS,
    POST_MESSAGE,

    groups
} from './constants'

import {
    LOGIN
} from 'containers/LoginPage/constants'

import {
    editorsLoaded,
    editorsLoadingError,

    usersLoaded,
    usersLoadingError,

    currentUserLoaded,
    currentUserLoadingError,

    rubricsLoaded,
    rubricsLoadingError,

    messagePosted,
    messagePostingError
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
        let { data } = yield call(api.getUsersInGroup, groups.editor);

        yield put(editorsLoaded(data));
    } catch (err) {
        yield put(editorsLoadingError(err));
    }
}

function* fetchUsers() {

    try {
        let { data } = yield call(api.getUser)

        yield put(usersLoaded(data));
    } catch (err) {
        yield put(usersLoadingError(err));
    }
}

function* fetchCurrentUser() {

    try {
        let { data } = yield call(api.getCurrentUser)

        yield put(currentUserLoaded(data));
    } catch (err) {
        yield put(currentUserLoadingError(err));
    }
}

function* usersData() {
    yield takeLatest(LOAD_EDITORS, fetchEditors);
    yield takeLatest(LOAD_USERS, fetchCurrentUser);
    yield takeLatest(LOAD_CURRENT_USER, fetchUsers);
}

export function* fetchRubrics() {

    try {
        let { data } = yield call(api.getRubrics);

        yield put(rubricsLoaded(data));
    } catch (err) {
        yield put(rubricsLoadingError(err));
    }
}

function* rubricsData() {
    yield takeLatest(LOAD_RUBRICS, fetchRubrics);
}

function* postMessage({ payload }) {
    let files = []

    if (payload.message.files) {
        for (let item, i = 0; item = payload.message.files[i++]; ) {
            let { data: { file: { id } } } = yield call(api.uploadFile, item)
            files.push(id)
        }
    }

    try {
        const data = yield call(api.postChatMessage, payload.room, {
            ...payload.message,
            files
        })

        yield put(messagePosted())
    } catch (err) {
        yield put(messagePostingError(err))
    }
}

function* uploadFile(file) {
    const data = yield call(api.uploadFile, file)

    yield data
}

function* addMessage() {
    yield takeEvery(POST_MESSAGE, postMessage)
}

export default [
    loginWatcher,
    usersData,
    rubricsData,
    addMessage
]
