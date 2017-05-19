import { take, call, put, select, cancel, takeLatest, takeEvery, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter';

import {
    LOAD_READY_NEWS,
    PUBLISH_ARTICLE,
    DELEGATE_ARTICLE,

    strings
} from './constants';

import {
    readyNewsLoaded,
    readyNewsLoadingError,

    articleDelegated,
    articleDelegationError,

    articlePublished,
    articlePublishingError
} from './actions';

import { selectSearchVars } from './selectors'

import * as api from 'api'

export function* getNews({ payload }) {

    const stateParams = yield select(selectSearchVars)

    try {
        const { data } = yield call(api.getReadyNews, {
            ...stateParams,
            ...payload
        });

        yield put(readyNewsLoaded(data));
    } catch (err) {
        yield put(readyNewsLoadingError(err));
    }
}

export function* publishArticle({ payload }) {

    try {
        yield call(api.publishArticle, payload);

        yield put(articlePublished(payload));

        toastr.success(strings.articlePublished)

        yield fork(getNews, {})
    } catch (err) {
        yield put(articlePublishingError(err));
    }
}

export function* delegateArticle({ payload }) {

    try {
        yield call(api.delegateArticle, payload)

        yield put(articleDelegated())

    } catch (err) {
        yield put(articleDelegationError(err))
    }
}

export function* readyData() {
    yield takeLatest(LOAD_READY_NEWS, getNews);

    yield takeEvery(PUBLISH_ARTICLE, publishArticle);

    yield takeEvery(DELEGATE_ARTICLE, delegateArticle);
}

export default [
    readyData,
]
