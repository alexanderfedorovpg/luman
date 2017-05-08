import config from 'config'
import axios from 'axios'
import { takeEvery, call, put, select } from 'redux-saga/effects'

import {
    fetchTop,
    topFetched,
    topFetchError,
    fetchMoreTop,

    fetchNoise,
    noiseFetched,
    noiseFetchError,
    fetchMoreNoise,

    fetchRelated,
    relatedFetched,
    relatedFetchError,

    fetchHome,
    homeFetched,
    homeFetchError
} from 'actions/news'

import {
    selectNoisePagination,
    selectTopPagination,
    selectTopRubric,
} from 'selectors/news'

const endpoint = config('apiEndpoint')

function* getTopItem(id) {
    try {
        const { data } = yield call(axios.get, `${endpoint}/news/${id}`)

        yield put(topFetched({
            data: [data]
        }))
    }
    catch (e) {
        yield put(topFetchError(e))
    }
}

function* getTopList(params) {
    try {
        const rubric = yield select(selectTopRubric)

        const { data } = yield call(axios.get, `${endpoint}/news`, {
            params: {
                ...params,
                limit: 16,
                top: 5,
                top_direction: 'up',
                rubrics_id: rubric
            }
        })

        yield put(topFetched({
            data: data.data,
            page: data.current_page,
            lastPage: data.last_page
        }))
    }
    catch (e) {
        yield put(topFetchError(e))
    }
}

function* getNoiseItem(id) {
    try {
        const { data } = yield call(axios.get, `${endpoint}/news/${id}`)

        yield put(noiseFetched({
            data: [data]
        }))
    }
    catch (e) {
        yield put(noiseFetchError(e))
    }
}

function* getNoiseList(params) {
    try {
        const { data } = yield call(axios.get, `${endpoint}/news`, {
            params: {
                ...params,
                limit: 30,
                top: 4,
                top_direction: 'down'
            }
        })

        yield put(noiseFetched({
            data: data.data,
            page: data.current_page,
            lastPage: data.last_page
        }))
    }
    catch (e) {
        yield put(noiseFetchError(e))
    }
}

export default function* news() {

    yield takeEvery(fetchTop.getType(), function* ({ payload }) {
        yield payload && payload.id
            ? call(getTopItem, payload.id)
            : call(getTopList)
    })

    yield takeEvery(fetchNoise.getType(), function* ({ payload }) {
        yield payload && payload.id
            ? call(getNoiseItem, payload.id)
            : call(getNoiseList)
    })

    yield takeEvery(fetchMoreTop.getType(), function* () {
        const { page, lastPage } = yield select(selectTopPagination)

        if (page < lastPage) {
            yield call(getTopList, { page: page+1 })
        }
    })

    yield takeEvery(fetchMoreNoise.getType(), function* () {
        const { page, lastPage } = yield select(selectNoisePagination)

        if (page < lastPage) {
            yield call(getNoiseList, { page: page+1 })
        }
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
