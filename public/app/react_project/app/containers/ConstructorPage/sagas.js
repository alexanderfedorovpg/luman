import { take, call, put, push, select, cancel, takeLatest, takeEvery, fork } from 'redux-saga/effects';

import {
    LOAD_HOME_NEWS,
    LOAD_CATEGORIES,
    LOAD_NEWS,
    SAVE_CHANGES,
} from './constants';

import {
    selectFilters,
    selectHomeNews
} from './selectors';

import {
    homeNewsLoadingError,
    homeNewsLoaded,
    loadHomeNews,

    newsLoadingError,
    newsLoaded,

    categoriesLoadingError,
    categoriesLoaded,

    changesSavingError,
    changesSaved,
} from './actions';


import * as api from 'api'

export function* getHomeNews() {

    try {
        const { data } = yield call(api.getHomepageNews)

        yield put(homeNewsLoaded({
            news: data.news,
            noise: data.info_noise,
            broadcast: data.from_air,
            war: !!+data.options.is_war_mode
        }))
    } catch (err) {
        yield put(homeNewsLoadingError(err))
    }
}

export function* saveHomeNews() {

    try {
        const data = yield select(selectHomeNews)

        const formData = {
            news: data.news.map(v => ({
                news_id: v.data.id,
                category_id: v.category.id,
                top: v.top
            })),
            from_air: data.broadcast.map(v => ({
                record_id: v.data.id,
                top: v.top
            })),
            info_noise: data.noise.map(v => ({
                news_id: v.data.id,
                top: v.top
            })),
            is_war_mode: +data.war
        }

        yield call(api.saveHomepageNews, formData)

        yield put(changesSaved())

        yield put(loadHomeNews())
    } catch (err) {
        yield put(changesSavingError(err))
    }
}

export function* getNews() {

    try {
        const filters = yield select(selectFilters)
        const { data } = yield call(api.getConstructorNews, { searchString: filters.search })

        yield put(newsLoaded(data))
    } catch (err) {
        yield put(newsLoadingError(err))
    }
}

export function* getCategories() {

    try {
        const { data } = yield call(api.getConstructorCategories)

        yield put(categoriesLoaded(data))
    } catch (err) {
        yield put(categoriesLoadingError(err))
    }
}

export function* constructorData() {
    yield takeLatest(LOAD_HOME_NEWS, getHomeNews)

    yield takeLatest(LOAD_NEWS, getNews)

    yield takeLatest(LOAD_CATEGORIES, getCategories)

    yield takeLatest(SAVE_CHANGES, saveHomeNews)
}


export default [
    constructorData
]
