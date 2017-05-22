import { take, call, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter';
import { showPreloader, hidePreloader } from 'containers/App/actions';
import {
    TO_FIX_ARTICLE,
    LOAD_ARTICLE,
    FINISH_ARTICLE,
    PUBLISH_ARTICLE,
    DELETE_ARTICLE,
    DELEGATE_ARTICLE,
} from './constants';

import {
    articleLoaded,
    articleLoadingError,
    articleDeleted,
    articleDeletionError,
    articleDelegated,
    articleDelegationError,
    articleFinished,
    articleFinishError,
    articlePublished,
    articlePublishError,
    articleSendedToFix,
    articleToFixError
} from './actions';

import * as api from 'api';

export function* getArticle({ payload }) {

    try {
        const { data } = yield call(api.getArticle, payload)

        yield put(articleLoaded(data))
    } catch (err) {
        yield put(articleLoadingError(err))
    }
}

export function* deleteArticle({ payload }) {

    try {
        yield call(api.deleteArticle, payload)

        yield put(articleDeleted())

        yield put(push(`/newslist`))
    } catch (err) {
        yield put(articleDeletionError(err))
    }
}

export function* delegateArticle({ payload }) {

    try {
        yield call(api.delegateArticle, payload)

        yield put(articleDelegated())

    } catch (err) {
        yield put(articleDelegationError(err))
    }
}

function* uploadFile(file) {
    if (!file || Number.isInteger(file)) {
        return file;
    }

    const { data: { file: { id } } } = yield call(api.uploadFile, file);
    return id;
}

function* uploadFiles(data) {
    const result = {};
    const files = ['image_main', 'image_preview', 'video_stream', 'video_stream_preview'];
    const responses = yield files.map((file) => call(uploadFile, data[file]));

    files.forEach((file, ind) => { result[file] = responses[ind]; });

    return result;
}

export function* finishArticle({ payload }) {
    try {
        yield put(showPreloader());
        const uploadedFiles = yield call(uploadFiles, payload);
        const data = { ...payload, ...uploadedFiles };

        yield call(api.finishArticle, data);

        yield put(hidePreloader());
        toastr.success('Изменения сохранены');

        yield put(articleFinished());

        // yield put(push(`/newslist`))
    } catch (err) {
        console.error(err);
        yield put(hidePreloader());
        toastr.error('Что-то пошло не так...');
        yield put(articleFinishError(err));
    }
}

export function* publishArticle({ payload }) {
    try {
        yield put(showPreloader());
        const uploadedFiles = yield call(uploadFiles, payload);
        const data = { ...payload, ...uploadedFiles };
        const { data: response } = yield call(api.finishArticle, data);

        yield call(api.publishArticle, response.id);

        yield put(hidePreloader());
        toastr.success('Новость опубликована');

        yield put(articlePublished());

        // yield put(push(`/newslist`))
    } catch (err) {
        yield put(hidePreloader());
        toastr.error('Что-то пошло не так...');
        yield put(articlePublishError(err));
    }
}

function* toFixArticle({ payload }) {
    try {
        yield call(api.toFixArticle, payload)

        yield put(articleSendedToFix())
    } catch (err) {
        yield put(articleToFixError(err))
    }
}

export function* articleData() {
    yield takeLatest(LOAD_ARTICLE, getArticle)

    yield takeLatest(TO_FIX_ARTICLE, toFixArticle)

    yield takeLatest(FINISH_ARTICLE, finishArticle)

    yield takeLatest(PUBLISH_ARTICLE, publishArticle)

    yield takeEvery(DELEGATE_ARTICLE, delegateArticle)

    yield takeEvery(DELETE_ARTICLE, deleteArticle)
}

export default [
    articleData
]
