import { take, call, put, cancel, fork, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import {
    LOAD_NEWSLIST,
    REJECT_ARTICLE,
    ACCEPT_ARTICLE,
    DELETE_ARTICLE,
    DELEGATE_ARTICLE
} from './constants'

import {
    newslistLoaded,
    newslistLoadingError,

    articleRejected,
    articleRejectionError,

    articleAccepted,
    articleAcceptionError,

    articleDeleted,
    articleDeletionError,

    articleDelegated,
    articleDelegationError
} from './actions'

import * as api from 'api'

export function* getList() {

    try {
        const data = yield call(api.getNewslist)

        yield put(newslistLoaded(data))
    } catch (err) {
        yield put(newslistLoadingError(err))
    }
}

export function* rejectArticle({ payload }) {

    try {
        yield call(api.rejectArticle, payload)

        yield put(articleRejected(payload))

        yield put(push(`/newslist`))

        yield fork(getList)
    } catch (err) {
        yield put(articleRejectionError(err))
    }
}

export function* acceptArticle({ payload }) {

    try {
        yield call(api.acceptArticle, payload)

        yield put(push(`/editor/${payload}`))

        yield put(articleAccepted(payload))

        yield fork(getList)
    } catch (err) {
        yield put(articleAcceptionError(err))
    }
}

export function* deleteArticle({ payload }) {

    try {
        yield call(api.deleteArticle, payload)

        yield put(articleDeleted(payload))

        // yield put(push(`/newslist`))
    } catch (err) {
        yield put(articleDeletionError(err))
    }
}

export function* delegateArticle({payload}) {

    try {
        yield call(api.delegateArticle, {id: payload.id, new_editor_id: payload.user.id})

        payload.editor = {
            email: payload.user.email,
            id: payload.user.id,
            login: payload.user.login
        }

        yield put(articleDelegated(payload));
    } catch (err) {
        yield put(articleDelegationError(err))
    }

}

export function* newslistData() {
    yield takeLatest(LOAD_NEWSLIST, getList)

    yield takeEvery(REJECT_ARTICLE, rejectArticle)

    yield takeEvery(ACCEPT_ARTICLE, acceptArticle)

    yield takeEvery(DELETE_ARTICLE, deleteArticle)

    yield takeEvery(DELEGATE_ARTICLE, delegateArticle)
}

export default [
    newslistData
]
