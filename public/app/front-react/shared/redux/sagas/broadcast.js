import config from 'config'
import axios from 'axios'
import { takeEvery, call, select, put } from 'redux-saga/effects'

import {
    fetch,
    fetched,
    fetchError,
    fetchMore
} from 'actions/broadcast'

import {
    selectPagination,
    selectProgram,
} from 'selectors/broadcast'

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

function* getBroadcastList(params) {
    try {

        const program = yield select(selectProgram)

        const { data } = yield call(axios.get, `${endpoint}/air/record`, {
            params: {
                ...params,
                limit: 16,
                programId: program
            }
        })

        yield put(fetched({
            data: data.data,
            page: data.current_page,
            lastPage: data.last_page
        }))
    }
    catch (e) {
        console.log(e)
        yield put(fetchError(e))
    }
}

export default function* broadcast() {

    yield takeEvery(fetch.getType(), function* ({ payload }) {
        yield payload && payload.id
            ? call(getBroadcastItem, payload.id)
            : call(getBroadcastList)
    })

    yield takeEvery(fetchMore.getType(), function* () {
        const { page, lastPage } = yield select(selectPagination)

        if (page < lastPage) {
            yield call(getBroadcastList, { page: page+1 })
        }
    })
}
