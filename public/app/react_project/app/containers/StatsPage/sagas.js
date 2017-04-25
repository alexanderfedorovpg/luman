/**
 * Created by work on 25.04.17.
 */
import { take, call, put, cancel, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import {
    LOAD_CATEGORIES_STATS
} from './constants'

import {
    loadCategoriesStatslist,
    categoriesStatsLoaded,
    categoriesStatsLoadingError
} from './actions'

import * as api from 'api'

export function* getList() {

    try {
        const data = yield call(api.getCategoryStats)

        yield put(categoriesStatsLoaded(data))
    } catch (err) {
        yield put(categoriesStatsLoadingError(err))
    }
}


export function* categoriesStatsData() {
    yield takeLatest(LOAD_CATEGORIES_STATS, getList)
}

export default [
    categoriesStatsData
]
