import { take, call, put, push, select, cancel, takeLatest, takeEvery, fork } from 'redux-saga/effects';

import {
    LOAD_NEWSLIST,
} from './constants';

import {
    loadNewslist,
    newslistLoadingError,
    newslistLoaded,
} from './actions';


import * as api from 'api'

export function* getList() {

    try {
        const data = yield call(api.getNewslist)

        yield put(newslistLoaded(data))
    } catch (err) {
        yield put(newslistLoadingError(err))
    }
}

export function* newslistData() {
    yield takeLatest(LOAD_NEWSLIST, getList)
}


export default [
    newslistData
]
