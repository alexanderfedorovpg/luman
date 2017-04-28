/**
 * Created by work on 25.04.17.
 */
import { take, call, put, cancel, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import {
    LOAD_CATEGORIES_STATS,
    LOAD_AUTHORS_STATS
} from './constants'

import {
    authorsLoaded,
    authorsLoadingError,
    categoriesStatsLoaded,
    categoriesStatsLoadingError
} from './actions'

import * as api from 'api'

export function* getCategoryStatsList() {
    try {
        const { data } = yield call(api.getCategoryStats);

        yield put(categoriesStatsLoaded(data))
    } catch (err) {
        yield put(categoriesStatsLoadingError(err))
    }
}

export function* getAuthorsStatsList() {

    try {
        const { data } = yield call(api.getAuthorStats);

        yield put(authorsLoaded(data))
    } catch (err) {
        yield put(authorsLoadingError(err))
    }
}

export function* statsData() {
    yield takeLatest(LOAD_AUTHORS_STATS, getAuthorsStatsList);
    yield takeLatest(LOAD_CATEGORIES_STATS, getCategoryStatsList);
}

export default [
    statsData
]
