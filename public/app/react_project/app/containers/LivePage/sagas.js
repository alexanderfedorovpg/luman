import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from 'api';
import { showPreloader, hidePreloader, showInfoModal } from 'containers/App/actions';
import {
    GET_NEWS,
    LIVE_ON,
} from './constants';
import {
    successGetNews,
    failureGetNews,
} from './actions';

export function* getNews() {
    try {
        const response = yield call(api.getNews, {
            limit: 5,
            filter_by: 'POPULARITY',
            order_direction: 'ASC',
        });

        const news = {
            byId: {},
            ids: [],
        };

        response.data.data.forEach((item) => {
            news.ids.push(item.id);
            news.byId[item.id] = {
                id: item.id,
                date: item.publish_date,
                category: item.category_id,
                rating: item.top,
                title: item.title,
                hashTags: item.tags,
                image: item.image_main,
            };
        });

        yield put(successGetNews(news));
    } catch (err) {
        console.error(err);
        yield put(failureGetNews());
    }
}

export function* liveOn({ payload }) {
    try {
        yield put(showPreloader());

        const data = {
            ...payload,
        };

        if (typeof payload.image_preview !== 'string') {
            const uploadedFile = yield call(api.uploadFile, payload.image_preview[0]);
            data.image_preview = uploadedFile.data.file.url;
        }

        yield put(hidePreloader());
    } catch (err) {
        console.error(err);
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось включить прямой эфир. Попробуйте еще раз'));
    }
}

// Individual exports for testing
export function* LiveData() {
    yield takeLatest(GET_NEWS, getNews);
    yield takeLatest(LIVE_ON, liveOn);
}

// All sagas to be loaded
export default [
    LiveData,
];
