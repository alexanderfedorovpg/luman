import { take, call, fork, put, cancel, takeLatest, takeEvery, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import { selectLocationState } from 'containers/App/selectors';
import { showPreloader, hidePreloader } from 'containers/App/actions';
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter'

import {
    LOAD_ONLINE,
    TOGGLE_ONLINE,

    LOAD_COMMENTS,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,

    SAVE_TITLE,
    SAVE_THESES,
    SAVE_COVER,

    strings
} from './constants'

import {
    onlineToggled,
    onlineTogglingError,

    onlineLoaded,
    onlineLoadingError,

    commentsLoaded,
    commentsLoadingError,

    commentAdded,
    commentAddingError,

    commentEdited,
    commentEditingError,

    commentDeleted,
    commentDeletingError,

    titleSaved,
    titleSavingError,

    thesesSaved,
    thesesSavingError,

    coverSaved,
    coverSavingError,
} from './actions'

import * as api from 'api'

export function* getArticle(payload) {

    try {
        const { data } = yield call(api.getArticle, payload)

        yield put(onlineLoaded([data]))
    } catch (err) {
        yield put(onlineLoadingError(err))
    }
}

export function* getArticleList() {

    try {
        const { data } = yield call(api.getOnlines)

        yield put(onlineLoaded(data))
    } catch (err) {
        yield put(onlineLoadingError(err))
    }
}

export function* getComments() {

    try {
        const state = yield select(selectLocationState);
        const id = state.locationBeforeTransitions.pathname.split('/').pop()

        const { data } = yield call(api.getOnlineComments, id)

        yield put(commentsLoaded(data))
    } catch (err) {
        yield put(commentsLoadingError(err))
    }
}

export function* postComment({ payload }) {

    try {
        const { data } = yield call(api.postOnlineComment, payload)

        toastr.success(strings.commentAdded)

        yield put(commentAdded(data))

        yield call(getComments)
    } catch (err) {
        yield put(commentAddingError(err))
    }
}

export function* putComment({ payload }) {

    try {
        const { data } = yield call(api.putOnlineComment, payload)

        toastr.success(strings.commentEdited)

        yield put(commentEdited(data))

        yield call(getComments)
    } catch (err) {
        yield put(commentEditingError(err))
    }
}

export function* deleteComment({ payload }) {

    try {
        const { data } = yield call(api.deleteOnlineComment, payload)

        toastr.success(strings.commentDeleted)

        yield put(commentDeleted(data))

        yield call(getComments)
    } catch (err) {
        yield put(commentDeletingError(err))
    }
}

export function* saveTitle({ payload }) {

    try {
        const { data } = yield call(api.putArticleTitle, payload)

        yield put(titleSaved(data))
    } catch (err) {
        yield put(titleSavingError(err))
    }
}

export function* saveTheses({ payload }) {

    try {
        const { data } = yield call(api.putArticleTheses, payload)

        yield put(thesesSaved(data))
    } catch (err) {
        yield put(thesesSavingError(err))
    }
}

export function* toggleOnline({ payload }) {

    try {
        yield put(showPreloader());
        const { data } = yield call(api.toggleOnlineStatus, payload)

        yield put(onlineToggled(data))

        yield fork(getArticleList)

        toastr.success(strings.onlineTurnedOff)
        yield put(push(`/translation`))

        yield put(hidePreloader());
    } catch (err) {
        toastr.error(strings.error)
        yield put(hidePreloader());
        yield put(onlineTogglingError(err))
    }
}

export function* saveCover({ payload }) {

    try {
        let { data: { file: { id } } } = yield call(api.uploadFile, payload.cover)
        payload.cover_id = id
        delete payload.cover

        const { data } = yield call(api.putArticleCover, payload)

        yield put(coverSaved(data))
    } catch (err) {
        yield put(coverSavingError(err))
    }
}

export function* onlineData() {
    yield takeEvery(LOAD_ONLINE, function* ({ payload }) {
        yield payload
            ? call(getArticle, payload)
            : call(getArticleList)
    })

    yield takeLatest(TOGGLE_ONLINE, toggleOnline)

    yield takeLatest(LOAD_COMMENTS, getComments)

    yield takeLatest(ADD_COMMENT, postComment)
    yield takeLatest(EDIT_COMMENT, putComment)
    yield takeLatest(DELETE_COMMENT, deleteComment)
}

export function* articleData() {
    yield takeLatest(SAVE_TITLE, saveTitle)

    yield takeLatest(SAVE_THESES, saveTheses)

    yield takeLatest(SAVE_COVER, saveCover)
}

export default [
    onlineData,
    articleData
]
