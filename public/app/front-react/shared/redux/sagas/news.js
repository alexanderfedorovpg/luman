import config from 'config'
import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import { fetch } from 'actions/news'

const endpoint = config('apiEndpoint')

export default function* news() {

    yield takeEvery(fetch.getType(), function* () {

        try {
            const data = yield call(axios.get, `${endpoint}/newslist`, {
                headers: {
                    'Authorization': 'Basic ZGVtbzpkZW1v'
                }
            })

            console.log(data)
        }
        catch (e) {

        }
    })
}
