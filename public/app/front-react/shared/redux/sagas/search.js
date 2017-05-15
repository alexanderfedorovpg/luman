import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import config from 'config';

import {
    search,
    searchSuccess,
    searchError,
} from 'actions/search';

const endpoint = config('apiEndpoint');

export function* searchSaga({ payload: query }) {
    try {
        const response = yield call(axios.get, `${endpoint}/news/search?query=${query}`);

        yield put(searchSuccess(response.data));
    } catch (err) {
        yield put(searchError(err));
    }
}

export default function* searchData() {
    yield takeEvery(search.getType(), searchSaga);
}
