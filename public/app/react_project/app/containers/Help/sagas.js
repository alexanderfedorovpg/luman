import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    GET_LINKS
} from './constants';

import {
    linksLoaded,
    linksLoadingError
} from './actions';

import * as api from 'api'

// FIXME: дублируется вызов
export function* getLinks({ payload }) {

    try {
        const { data } = yield call(api.getLinks, payload);
        yield put(linksLoaded(data));
    } catch (err) {
        yield put(linksLoadingError(err));
    }
}

export function* searchLinks() {
    const watcher = yield takeLatest(GET_LINKS, getLinks);

    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export default [
    searchLinks
]
