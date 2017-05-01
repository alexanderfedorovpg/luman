/**
 * Created by work on 25.04.17.
 */
import { take, call, put, select, cancel, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import {makeSelectType} from './selectors'


import {
    LOAD_CATEGORIES_PAGE_STATS,
} from './constants'

import {
    categoriesPagetatsLoaded,
    categoriesStatsPageLoadingError
} from './actions'

import * as api from 'api'

export function* getCategoryStatsList() {
    try {
        console.log('SAGAS');
        const type = yield select(makeSelectType()); // HANGS
        console.log('END');
        const { data } = yield call(api.getOneCategoryStat, type);

        yield put(categoriesPagetatsLoaded(data))

    } catch (err) {
        yield put(categoriesStatsPageLoadingError(err))
    }
}


export function* statsData() {
    yield takeLatest(LOAD_CATEGORIES_PAGE_STATS, getCategoryStatsList);
}

export default [
    statsData
]
