import config from 'config'
import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {
    fetch,
    fetched,
    fetchError
} from 'actions/rubrics'

const endpoint = config('apiEndpoint')

export default function* rubrics() {

    yield takeEvery(fetch.getType(), function* () {

        try {
            const { data: { data } } = yield call(axios.get, `${endpoint}/rubrics`)

            yield put(fetched(data))
        }
        catch (e) {
            yield put(fetchError(e))
        }
    })
}
