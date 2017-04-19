import { take, call, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects'
import { LOCATION_CHANGE } from 'react-router-redux'

import {
    LOAD_CHAT_MESSAGES,
    LOAD_ARTICLE,
    POST_MESSAGE
} from './constants'

import {
    articleLoaded,
    articleLoadingError,
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

export function* articleData() {
    yield takeLatest(LOAD_ARTICLE, getArticle)
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
