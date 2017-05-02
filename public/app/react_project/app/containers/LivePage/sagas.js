import { takeEvery, takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from 'api';
// import { showPreloader, hidePreloader, showInfoModal } from 'containers/App/actions';
import {
    GET_NEWS,
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

// Individual exports for testing
export function* LiveData() {
    yield takeLatest(GET_NEWS, getNews);
}

// All sagas to be loaded
export default [
    LiveData,
];
