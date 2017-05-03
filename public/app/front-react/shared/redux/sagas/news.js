import config from 'config'
import axios from 'axios'
import { takeEvery, call, put } from 'redux-saga/effects'

import {
    fetch,
    fetched,
    fetchError,

    fetchRelated,
    relatedFetched,
    relatedFetchError,

    fetchVideo,
    videoFetched,
    videoFetchError,

    fetchHome,
    homeFetched,
    homeFetchError
} from 'actions/news'

const endpoint = config('apiEndpoint')

function* getNewsItem(id) {
    try {
        const { data } = yield call(axios.get, `${endpoint}/news/${id}`)

        yield put(fetched([data]))
    }
    catch (e) {
        yield put(fetchError(e))
    }
}

function* getNewsList() {
    try {
        const { data: { data } } = yield call(axios.get, `${endpoint}/news`)

        yield put(fetched(data))
    }
    catch (e) {
        yield put(fetchError(e))
    }
}

export default function* news() {

    yield takeEvery(fetch.getType(), function* ({ payload }) {
        yield payload && payload.id
            ? call(getNewsItem, payload.id)
            : call(getNewsList)
    })

    yield takeEvery(fetchRelated.getType(), function* ({ payload }) {

        try {
            const { data } = yield call(axios.get, `${endpoint}/news/${payload}/related`)

            yield put(relatedFetched(data))
        }
        catch (e) {
            yield put(relatedfetchError(e))
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
