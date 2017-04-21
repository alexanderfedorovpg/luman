import { take, call, put, select, cancel, takeLatest, takeEvery, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    LOAD_FEED,
    HIDE_FEED_ITEM,
    FEED_TO_WORK
} from './constants';

import {
    feedLoaded,
    feedLoadingError,
    feedItemHidden,
    feedItemHidingError,
    feedInWork,
    feedToWorkError
} from './actions';

import { selectFeedParams } from './selectors'

import * as api from 'api'

export function* getFeed({ payload }) {

    const stateParams = yield select(selectFeedParams)

    try {
        const feed = yield call(api.getFeed, {
            ...stateParams,
            ...payload
        });
        yield put(feedLoaded(feed));
    } catch (err) {
        yield put(feedLoadingError(err));
    }
}

export function* feedData() {
    const watcher = yield takeLatest(LOAD_FEED, getFeed);

    // Suspend execution until location changes
    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

export function* hideItem({ payload }) {

    try {
        yield call(api.hideFeedItem, payload);
        yield put(feedItemHidden(payload));

        yield fork(getFeed, {})
    } catch (err) {
        yield put(feedItemHidingError(err));
    }
}

export function* hideData() {
    yield takeLatest(HIDE_FEED_ITEM, hideItem);
}

export function* feedToWork({ payload }) {

    try {
        yield call(api.feedToWork, payload);

        yield put(feedInWork());
    } catch (err) {
        yield put(feedToWorkError(err));
    }
}

export function* toWork() {
    yield takeEvery(FEED_TO_WORK, feedToWork);
}

export default [
    feedData,
    hideData,
    toWork
]
