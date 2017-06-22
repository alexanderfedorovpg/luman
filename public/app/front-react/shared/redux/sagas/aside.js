import config from 'config';
import axios from 'axios';
import { takeEvery, takeLatest, call, select, put } from 'redux-saga/effects';

import { fetchCoverImg, fetchedCoverImg, fetchError } from 'actions/aside';

const endpoint = config('apiEndpoint');

function* getCoverImg() {
    try {
        const { data } = yield call(axios.get, `${endpoint}/air/cover`);
        yield put(fetchedCoverImg(data));
    } catch (e) {
        yield put(fetchError(e));
    }
}

export default function* aside() {
    yield takeLatest(fetchCoverImg.getType(), function* () {
        yield call(getCoverImg);
    });
}
