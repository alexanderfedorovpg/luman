import { take, call, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter'

import {
    LOAD_CHAT_MESSAGES,
} from './constants'

import {
    chatMessagesLoaded,
    chatMessagesLoadingError,
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

export default [
    chatData,
]
