import config from 'config'
import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {
    fetch,
    fetched,
    fetchError
} from 'actions/programs'

const endpoint = config('apiEndpoint')

export default function* programs() {

    yield takeEvery(fetch.getType(), function* () {

        try {
            const { data: { data } } = yield call(axios.get, `${endpoint}/tv-program`)

            yield put(fetched(data))
        }
        catch (e) {
            yield put(fetchError(e))
        }
    })
}
