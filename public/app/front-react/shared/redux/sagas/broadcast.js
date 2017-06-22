import config from 'config';
import axios from 'axios';
import { takeEvery, call, select, put } from 'redux-saga/effects';

import {
    fetch,
    fetched,
    fetchError,
    fetchMore,
    changeDateFilter,
} from 'actions/broadcast';

import {
    selectBroadcastIds,
    selectProgram,
    selectFilters,
} from 'selectors/broadcast';

const endpoint = config('apiEndpoint');

function* getBroadcastItem(id) {
    try {
        const { data } = yield call(axios.get, `${endpoint}/air/record/${id}`);

        yield put(fetched({ data: [data] }));
    } catch (e) {
        yield put(fetchError(e));
    }
}

function filtersToParams({ startDate, endDate }) {
    const params = {};

    if (startDate) {
        params.publish_date_from = startDate;
    }

    if (endDate) {
        params.publish_date_to = endDate;
    }

    return params;
}

function* getBroadcastList(params, replace) {
    try {
        const program = yield select(selectProgram);
        const filters = yield select(selectFilters);
        const filterParams = filtersToParams(filters);

        const { data } = yield call(axios.get, `${endpoint}/air/record`, {
            params: {
                ...filterParams,
                limit: 16,
                programId: program,
                filter_by: 'TIME',
                order_direction: 'DESC',
                ...params,
            },
        });

        yield put(fetched({
            data: data.data,
            total: data.total,
            replace,
        }));
    } catch (e) {
        console.log(e);
        yield put(fetchError(e));
    }
}

export default function* broadcast() {
    yield takeEvery(fetch.getType(), function* ({ payload = {} }) {
        yield payload.id
            ? call(getBroadcastItem, payload.id)
            : call(getBroadcastList, payload.params || {}, payload.replace);
    });

    yield takeEvery(fetchMore.getType(), function* () {
        const loadedRecords = yield select(selectBroadcastIds);
        yield call(getBroadcastList, { offset: loadedRecords.length });
    });

    yield takeEvery(changeDateFilter.getType(), function* () {
        yield call(getBroadcastList, null, true);
    });
}
