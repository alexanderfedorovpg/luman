import config from 'config'
import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {
    fetch,
    fetched,
    fetchError
} from 'actions/broadcast'

const endpoint = config('apiEndpoint')

function* getBroadcastItem(id) {
    try {
        const { data } = yield call(axios.get, `${endpoint}/air/record/${id}`)

        yield put(fetched([data]))
    }
    catch (e) {
        yield put(fetchError(e))
    }
}

function* getBroadcastList() {
    try {
        const { data } = yield call(axios.get, `${endpoint}/air/record`)

        yield put(fetched(data))
    }
    catch (e) {
        yield put(fetchError(e))
    }
}

export default function* broadcast() {

    yield takeEvery(fetch.getType(), function* ({ payload }) {
        yield payload && payload.id
            ? call(getBroadcastItem, payload.id)
            : call(getBroadcastList)
    })
}
