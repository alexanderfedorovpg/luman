import config from 'config'
import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {
    fetch,
    fetched,
    fetchError
} from 'actions/broadcast'

const endpoint = config('apiEndpoint')

export default function* broadcast() {

    yield takeEvery(fetch.getType(), function* () {

        try {
            const { data } = yield call(axios.get, `${endpoint}/air/record`)

            yield put(fetched(data))
        }
        catch (e) {
            yield put(fetchError(e))
        }
    })
}
