import config from 'config'
import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {
    fetch,
    fetched,
    fetchError,

    fetchVideo,
    videoFetched,
    videoFetchError,

    fetchHome,
    homeFetched,
    homeFetchError
} from 'actions/news'

const endpoint = config('apiEndpoint')

export default function* news() {

    yield takeEvery(fetch.getType(), function* () {

        try {
            const { data } = yield call(axios.get, `${endpoint}/newslist`)

            yield put(fetched(data))
        }
        catch (e) {
            yield put(fetchError(e))
        }
    })

    yield takeEvery(fetchVideo.getType(), function* () {

        try {
            const { data } = yield call(axios.get, `${endpoint}/newslist?video="true"`)

            yield put(videoFetched(data))
        }
        catch (e) {
            yield put(videoFetchError(e))
        }
    })

    yield takeEvery(fetchHome.getType(), function* () {

        try {
            const { data } = yield call(axios.get, `${endpoint}/news/homepage`)

            yield put(homeFetched({
                news: data.news,
                noise: data.info_noise,
                broadcast: data.from_air
            }))
        }
        catch (e) {
            yield put(homeFetchError(e))
        }
    })
}
