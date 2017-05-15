import axios from 'axios';
import { takeLatest, call, put, select } from 'redux-saga/effects';
import config from 'config';

import {
    setInitialState,
    search,
    searchSuccess,
    searchError,
    changeSearchCategory,
} from 'actions/search';

const endpoint = config('apiEndpoint');

const selectCurrentCategory = state => state.search.category;
const selectQuery = state => state.search.query;

export function* searchSaga({ payload: query }) {
    try {
        const params = { query };
        const category = yield select(selectCurrentCategory);

        if (category !== 'all') {
            params.category = category;
        }

        const response = yield call(axios.get, `${endpoint}/news/search`, { params });

        yield put(searchSuccess(response.data));
    } catch (err) {
        yield put(searchError(err));
    }
}

export function* getQueryAndSearch() {
    const query = yield select(selectQuery);
    yield put(search(query));
}

export default function* searchData() {
    yield takeLatest(search.getType(), searchSaga);
    yield takeLatest(changeSearchCategory.getType(), getQueryAndSearch);
    yield takeLatest(setInitialState.getType(), getQueryAndSearch);
}
