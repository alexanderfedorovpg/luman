/**
 * Created by work on 25.04.17.
 */
import { take, call, put, select, cancel, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import {makeSelectType} from './selectors'

import {
    LOAD_AUTHORS_STATS,
} from './constants'

import {
    authorsPagetatsLoaded,
    authorsPageLoadingError,
} from './actions'

import * as api from 'api'

export function* getCategoryStatsList({ payload }) {
    try {
        const { data } = yield call(api.getOneAuthorStats, payload.category);

        yield put(authorsPagetatsLoaded(data))

    } catch (err) {
        yield put(authorsPageLoadingError(err))
    }
}


export function* statsData() {
    yield takeLatest(LOAD_AUTHORS_STATS, getCategoryStatsList);
}

export default [
    statsData
]
