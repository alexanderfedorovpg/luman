import { take, call, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import {
    LOAD_CHAT_MESSAGES,
    LOAD_ARTICLE,
    FINISH_ARTICLE,
    DELETE_ARTICLE,
    DELEGATE_ARTICLE,
    POST_MESSAGE
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
    chatMessagesLoaded,
    chatMessagesLoadingError,
    messagePosted,
    messagePostingError
} from './actions'

import * as api from 'api'

export function* getMessages({ payload }) {

    try {
        const { data } = yield call(api.getChatMessages, payload)

        yield put(chatMessagesLoaded(data))
    } catch (err) {
        yield put(chatMessagesLoadingError(err))
    }
}

export function* chatData() {
    yield takeLatest(LOAD_CHAT_MESSAGES, getMessages)
}

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
    if (!Number.isInteger(payload.image_main)) {
        let { data: { file: { id: idMain } } } = yield call(api.uploadFile, payload.image_main)
        payload.image_main = idMain
    }

    if (!Number.isInteger(payload.image_preview)) {
        let { data: { file: { id: idPreview } } } = yield call(api.uploadFile, payload.image_preview)
        payload.image_preview = idPreview
    }


    try {
        yield call(api.finishArticle, payload)

        yield put(articleFinished())

        yield put(push(`/newslist`))
    } catch (err) {
        yield put(articleFinishError(err))
    }
}

export function* articleData() {
    yield takeLatest(LOAD_ARTICLE, getArticle)

    yield takeLatest(FINISH_ARTICLE, finishArticle)

    yield takeEvery(DELEGATE_ARTICLE, delegateArticle)

    yield takeEvery(DELEGATE_ARTICLE, delegateArticle)
}

export function* postMessage({ payload }) {
    let files = []

    for (let item, i = 0; item = payload.message.files[i++]; ) {
        let { data: { file: { id } } } = yield call(api.uploadFile, item)
        files.push(id)
    }

    try {
        const data = yield call(api.postChatMessage, payload.room, {
            ...payload.message,
            files
        })

        yield put(messagePosted())
    } catch (err) {
        yield put(messagePostingError(err))
    }
}

export function* uploadFile(file) {
    const data = yield call(api.uploadFile, file)

    console.log('f', data)
    yield data
}

export function* addMessage() {
    yield takeEvery(POST_MESSAGE, postMessage)
}

export default [
    chatData,
    articleData,
    addMessage
]
