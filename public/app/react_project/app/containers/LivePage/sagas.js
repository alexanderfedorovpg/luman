import { takeLatest, call, put, take } from 'redux-saga/effects';
import * as api from 'api';
import { showPreloader, hidePreloader, showInfoModal } from 'containers/App/actions';
import {
    GET_NEWS,
    LIVE_ON,
    NEWS_TO_LIVE,
    NEWS_TO_LIVE_SUCCESS,
    NEWS_TO_LIVE_FAILURE,
    GET_LIVE,
} from './constants';
import {
    successGetNews,
    failureGetNews,
    successGetLive,
    failureGetLive,
    successLiveOn,
    failureLiveOn,
    successLiveOff,
    failureLiveOff,
    successNewsToLive,
    failureNewsToLive,
    newsToLive,
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

export function* sendNews({ payload }) {
    try {
        const data = {
            ...payload,
        };

        if (typeof payload.image_preview !== 'string') {
            const uploadedFile = yield call(api.uploadFile, payload.image_preview[0]);
            data.image_preview = uploadedFile.data.file.url;
        }

        const response = yield call(api.newsToLive, data);

        if (response.data.success) {
            yield put(successNewsToLive());
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        yield put(failureNewsToLive());
    }
}

export function* getLive() {
    try {
        const response = yield call(api.getLive);

        yield put(successGetLive(response.data.stream_url));
    } catch (err) {
        console.error(err);
        yield put(failureGetLive());
    }
}

export function* liveOn({ payload }) {
    try {
        yield put(showPreloader());
        yield put(newsToLive(payload));

        // После отправки новости отлавливаем все actions
        // Если новость удалось отправить вызываем successLiveOn
        // если нет, то передаем управление в catch
        while (true) { // eslint-disable-line no-constant-condition
            const action = yield take('*');

            if (action.type === NEWS_TO_LIVE_SUCCESS) {
                yield put(hidePreloader());
                yield put(successLiveOn());
                break;
            } else if (action.type === NEWS_TO_LIVE_FAILURE) {
                throw new Error();
            }
        }
    } catch (err) {
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось включить прямой эфир. Попробуйте еще раз'));
        yield put(failureLiveOn());
    }
}

// Individual exports for testing
export function* LiveData() {
    yield takeLatest(GET_NEWS, getNews);
    yield takeLatest(LIVE_ON, liveOn);
    yield takeLatest(NEWS_TO_LIVE, sendNews);
    yield takeLatest(GET_LIVE, getLive);
}

// All sagas to be loaded
export default [
    LiveData,
];

