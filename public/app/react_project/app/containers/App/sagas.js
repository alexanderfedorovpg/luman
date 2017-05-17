import { take, call, put, select, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    loginSuccess,
    loginError,
} from 'containers/LoginPage/actions';

import * as api from 'api';

import {
    LOGIN,
} from 'containers/LoginPage/constants';

import {
    LOAD_EDITORS,
    LOAD_USERS,
    LOAD_CURRENT_USER,
    LOAD_RUBRICS,
    POST_MESSAGE,
    LOAD_PROGRAMS,
    LOAD_GROUPS,

    groups as groupsMap,
} from './constants';

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
    messagePostingError,

    successLoadPrograms,
    failureLoadPrograms,

    successLoadGroups,
    failureLoadGroups,
} from './actions';

function* login({ payload }) {
    try {
        const { data: { api_token } } = yield call(api.login, {
            ...payload,
        });

        api.setToken(api_token);

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
        const { data } = yield call(api.getUsersInGroup, groupsMap.editor);

        yield put(editorsLoaded(data));
    } catch (err) {
        yield put(editorsLoadingError(err));
    }
}

function* fetchUsers() {
    try {
        const { data } = yield call(api.getUser);

        yield put(usersLoaded(data));
    } catch (err) {
        yield put(usersLoadingError(err));
    }
}

function* fetchCurrentUser() {
    try {
        const { data } = yield call(api.getCurrentUser);

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
        const { data } = yield call(api.getRubrics);

        yield put(rubricsLoaded(data));
    } catch (err) {
        yield put(rubricsLoadingError(err));
    }
}

function* rubricsData() {
    yield takeLatest(LOAD_RUBRICS, fetchRubrics);
}

function* postMessage({ payload }) {
    const files = [];

    if (payload.message.files) {
        for (let item, i = 0; item = payload.message.files[i++];) {
            const { data: { file: { id } } } = yield call(api.uploadFile, item);
            files.push(id);
        }
    }

    try {
        const data = yield call(api.postChatMessage, payload.room, {
            ...payload.message,
            files,
        });

        yield put(messagePosted());
    } catch (err) {
        yield put(messagePostingError(err));
    }
}

function* uploadFile(file) {
    const data = yield call(api.uploadFile, file);

    yield data;
}

function* addMessage() {
    yield takeEvery(POST_MESSAGE, postMessage);
}

export function* getPrograms() {
    try {
        const response = yield call(api.getPrograms);
        const programs = {
            byId: {},
            ids: [],
        };

        response.data.forEach((program) => {
            programs.byId[program.id] = program;
            programs.ids.push(program.id);
        });

        yield put(successLoadPrograms(programs));
    } catch (err) {
        console.error(err);
        yield put(failureLoadPrograms(err));
    }
}

export function* programsData() {
    yield takeLatest(LOAD_PROGRAMS, getPrograms);
}

export function* loadGroups() {
    try {
        const response = yield call(api.getGroups);
        const groups = {
            byId: {},
            ids: [],
        };

        response.data.forEach((group) => {
            groups.byId[group.id] = group;
            groups.ids.push(group.id);
        });

        yield put(successLoadGroups(groups));
    } catch (err) {
        console.error(err);
        yield put(failureLoadGroups(err));
    }
}

export function* groupsData() {
    yield takeLatest(LOAD_GROUPS, loadGroups);
}

export default [
    loginWatcher,
    usersData,
    rubricsData,
    addMessage,
    programsData,
    groupsData,
];
