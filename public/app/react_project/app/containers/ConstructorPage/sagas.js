import { call, put, select, takeLatest, takeEvery } from 'redux-saga/effects';
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter';
import * as api from 'api';

import {
    LOAD_HOME_NEWS,
    LOAD_CATEGORIES,
    SAVE_CHANGES,
    REMOVE_FROM_CONSTRUCTOR,
    LOAD_ITEMS,

    strings,
} from './constants';

import {
    selectFilters,
    selectHomeNews,
} from './selectors';

import {
    homeNewsLoadingError,
    homeNewsLoaded,
    loadHomeNews,

    categoriesLoadingError,
    categoriesLoaded,

    changesSavingError,
    changesSaved,

    successRemoveFromConstructor,
    failureRemoveFromConstructor,

    successLoadItems,
    failureLoadItems,
} from './actions';


export function* getHomeNews() {
    try {
        const { data } = yield call(api.getHomepageNews);

        yield put(homeNewsLoaded({
            news: data.news,
            noise: data.info_noise,
            broadcast: data.from_air,
            options: {
                war: !!+data.options.is_war_mode,
                title: data.options.war_mode_title,
            },
            war: data.war,
        }));
    } catch (err) {
        yield put(homeNewsLoadingError(err));
    }
}

export function* saveHomeNews() {
    try {
        const data = yield select(selectHomeNews);

        const formData = {
            news: data.news.map((v) => ({
                news_id: v.data.id,
                category_id: v.category.id,
                top: v.top,
            })),
            war: data.war.map((v) => ({
                news_id: v.data.id,
                category_id: v.category.id,
                top: v.top,
            })),
            from_air: data.broadcast.map((v) => ({
                record_id: v.data.id,
                top: v.top,
            })),
            info_noise: data.noise.map((v) => ({
                news_id: v.data.id,
                top: v.top,
            })),
            is_war_mode: +data.options.war,
            war_mode_title: data.options.title,
        };

        yield call(api.saveHomepageNews, formData);

        toastr.success(strings.saveHomeSuccess);

        yield put(changesSaved());

        yield put(loadHomeNews());
    } catch (err) {
        yield put(changesSavingError(err));
    }
}

export function* getCategories() {
    try {
        const { data } = yield call(api.getConstructorCategories);

        yield put(categoriesLoaded(data));
    } catch (err) {
        yield put(categoriesLoadingError(err));
    }
}

export function* removeFromConstructor({ payload: { id, type } }) {
    try {
        if (type === 'news') {
            yield call(api.removeArticleFromConstructor, id);
        } else {
            yield call(api.removeRecordFromConstructor, id);
        }

        yield put(successRemoveFromConstructor(id));
    } catch (err) {
        yield put(failureRemoveFromConstructor(err));
    }
}

export function* getItems({ payload: { type } }) {
    try {
        const filters = yield select(selectFilters);
        let data;

        if (type === 'news') {
            const response = yield call(api.getConstructorNews, { searchString: filters.search });

            data = response.data;
        } else {
            const params = {
                fullVideo: false,
                constructor: false,
                search: filters.search,
            };
            const response = yield call(api.getRecords, params);

            data = response.data;
        }

        yield put(successLoadItems(data));
    } catch (err) {
        yield put(failureLoadItems(err));
    }
}

export function* constructorData() {
    yield takeLatest(LOAD_HOME_NEWS, getHomeNews);
    yield takeLatest(LOAD_CATEGORIES, getCategories);
    yield takeLatest(SAVE_CHANGES, saveHomeNews);
    yield takeLatest(LOAD_ITEMS, getItems);
    yield takeEvery(REMOVE_FROM_CONSTRUCTOR, removeFromConstructor);
}

export default [
    constructorData,
];
