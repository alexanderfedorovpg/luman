import { take, call, put, select, cancel, takeLatest, takeEvery, fork } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
    LOAD_READY_NEWS,
    PUBLISH_ARTICLE
} from './constants';

import {
    readyNewsLoaded,
    readyNewsLoadingError,

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
        yield call(api.publishModeratedArticle, payload);

        yield put(articlePublished(payload));

        yield fork(getNews, {})
    } catch (err) {
        yield put(articlePublishingError(err));
    }
}

export function* readyData() {
    yield takeLatest(LOAD_READY_NEWS, getNews);

    yield takeEvery(PUBLISH_ARTICLE, publishArticle);
}

export default [
    readyData,
]
