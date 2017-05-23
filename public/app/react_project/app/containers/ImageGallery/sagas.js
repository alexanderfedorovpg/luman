import { take, call, put, cancel, takeLatest } from 'redux-saga/effects';

import {
    GET_IMAGES,

    SAVE_IMAGE,
} from './constants';

import {
    imagesLoaded,
    imagesLoadingError,

    imageSaved,
    imageSavingError,
} from './actions';

import * as api from 'api'

export function* loadImages({ payload }) {

    try {
        const { data: { data } } = yield call(api.getFiles, payload);

        yield put(imagesLoaded(data));
    } catch (err) {
        yield put(imagesLoadingError(err));
    }
}

export function* saveImage({ payload }) {
console.log(payload)
return

    try {
        const { data } = yield call(api.uploadFile, payload.image, payload);

        yield put(imageSaved(data));
    } catch (err) {
        yield put(imageSavingError(err));
    }
}

export function* imageGallery() {
    yield takeLatest(GET_IMAGES, loadImages);

    yield takeLatest(SAVE_IMAGE, saveImage)
}

export default [
    imageGallery
]
