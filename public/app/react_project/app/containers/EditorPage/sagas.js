import { take, call, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter'

import {
    TO_FIX_ARTICLE,
    LOAD_ARTICLE,
    FINISH_ARTICLE,
    PUBLISH_ARTICLE,
    DELETE_ARTICLE,
    DELEGATE_ARTICLE,
} from './constants'

import {
    articleLoaded,
    articleLoadingError,
    articleDeleted,
    articleDeletionError,
    articleDelegated,
    articleDelegationError,
    articleFinished,
    articleFinishError,
    articlePublished,
    articlePublishError,
    articleSendedToFix,
    articleToFixError
} from './actions'

import * as api from 'api'

export function* getArticle({ payload }) {

    try {
        const { data } = yield call(api.getArticle, payload)

        yield put(articleLoaded(data))
    } catch (err) {
        yield put(articleLoadingError(err))
    }
}

export function* deleteArticle({ payload }) {

    try {
        yield call(api.deleteArticle, payload)

        yield put(articleDeleted())

        yield put(push(`/newslist`))
    } catch (err) {
        yield put(articleDeletionError(err))
    }
}

export function* delegateArticle({ payload }) {

    try {
        yield call(api.delegateArticle, payload)

        yield put(articleDelegated())

        yield put(push(`/newslist`))
    } catch (err) {
        yield put(articleDelegationError(err))
    }
}

export function* finishArticle({ payload }) {
    try {
        if (!Number.isInteger(payload.image_main)) {
            let { data: { file: { id: idMain } } } = yield call(api.uploadFile, payload.image_main)
            payload.image_main = idMain
        }

        if (!Number.isInteger(payload.image_preview)) {
            let { data: { file: { id: idPreview } } } = yield call(api.uploadFile, payload.image_preview)
            payload.image_preview = idPreview
        }

        yield call(api.finishArticle, payload)

        toastr.success('Изменения сохранены')

        yield put(articleFinished())

        // yield put(push(`/newslist`))
    } catch (err) {
        toastr.error('Что-то пошло не так...')
        yield put(articleFinishError(err))
    }
}

export function* publishArticle({ payload }) {
    try {
        if (!Number.isInteger(payload.image_main)) {
            let { data: { file: { id: idMain } } } = yield call(api.uploadFile, payload.image_main)
            payload.image_main = idMain
        }

        if (!Number.isInteger(payload.image_preview)) {
            let { data: { file: { id: idPreview } } } = yield call(api.uploadFile, payload.image_preview)
            payload.image_preview = idPreview
        }

        yield call(api.finishArticle, payload)

        yield call(api.publishArticle, payload.id)

        toastr.success('Новость опубликована')

        yield put(articlePublished())

        // yield put(push(`/newslist`))
    } catch (err) {
        toastr.error('Что-то пошло не так...')
        yield put(articlePublishError(err))
    }
}

function* toFixArticle({ payload }) {
    try {
        yield call(api.toFixArticle, payload)

        yield put(articleSendedToFix())
    } catch (err) {
        yield put(articleToFixError(err))
    }
}

export function* articleData() {
    yield takeLatest(LOAD_ARTICLE, getArticle)

    yield takeLatest(TO_FIX_ARTICLE, toFixArticle)

    yield takeLatest(FINISH_ARTICLE, finishArticle)

    yield takeLatest(PUBLISH_ARTICLE, publishArticle)

    yield takeEvery(DELEGATE_ARTICLE, delegateArticle)

    yield takeEvery(DELEGATE_ARTICLE, delegateArticle)
}

export default [
    articleData
]
