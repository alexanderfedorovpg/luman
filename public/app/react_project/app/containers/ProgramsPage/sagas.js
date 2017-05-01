import {
    call,
    put,
    select,
    take,
    cancel,
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import * as api from 'api';
import { showPreloader, hidePreloader, showInfoModal } from 'containers/App/actions';
import {
    successLoadPrograms,
    failureLoadPrograms,
    successDeleteRecord,
    failureDeleteRecord,
    successLoadRecords,
    failureLoadRecords,
    successPostRecord,
    failurePostRecord,
    successEditRecord,
    failureEditRecord,
    successPublishRecords,
    failurePublishRecords,
    selectRecord,
    openModal,
    closeModal,
} from './actions';
import {
    SET_RECORDS_TYPE,
    CHANGE_PROGRAM,
    OPEN_PAGE,
    LOAD_PROGRAMS,
    DELETE_RECORD,
    LOAD_RECORDS,
    PENDING_RECORDS,
    POST_RECORD,
    EDIT_RECORD,
    RECORDS_LIMIT,
    START_EDIT_RECORD,
    MODALS,
    SEARCH_RECORD,
    PLAY_VIDEO,
    WANT_DELETE_RECORD,
    PUBLISH_RECORDS,
} from './constants';

const getRecordsType = (state) => state.getIn(['programsPage', 'recordsType']);
const getRecordsOffset = (state) => state.getIn(['programsPage', 'records']).size;
const getProgramId = (state) => state.getIn(['programsPage', 'selectedProgram']);
const getSearchQuery = (state) => state.getIn(['programsPage', 'searchQuery']);
const getUnpublishedRecords = (state) => {
    const records = state.getIn(['programsPage', 'records']);

    if (!records) {
        return [];
    }

    return records.toJS().filter((record) => !record.is_published);
};

export function* getPrograms() {
    try {
        const response = yield call(api.getPrograms);
        const programs = {
            byId: {},
            ids: [],
        };

        response.data.forEach((program) => {
            programs.byId[program.id] = program;
            programs.ids.push(program.id);
        });

        yield put(successLoadPrograms(programs));
    } catch (err) {
        console.error(err);
        yield put(failureLoadPrograms(err));
    }
}

export function* wantDeleteRecord() {
    yield put(openModal(MODALS.confirmRecordDelete));
}

export function* deleteRecord({ payload }) {
    try {
        yield put(showPreloader());

        const response = yield call(api.deleteRecord, payload.id);

        yield put(hidePreloader());

        if (response.data.success) {
            yield put(successDeleteRecord(payload.id));
            yield put(closeModal());
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        console.error(err);
        yield put(failureDeleteRecord(err));
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось удалить запись. Попробуйте еще раз'));
    }
}

export function* getRecords(action = { payload: {} }) {
    try {
        yield put({ type: PENDING_RECORDS });

        const params = {};
        const { payload } = action;
        const replace = typeof payload.replace === 'undefined' ? true : payload.replace;

        const [type, programId, offset, search] = yield [
            select(getRecordsType),
            select(getProgramId),
            select(getRecordsOffset),
            select(getSearchQuery),
        ];

        if (programId >= 0) {
            params.programId = programId;
        }

        if (search) {
            params.search = search;
        }

        params.fullVideo = type === 'FULL';
        // Если нужно заменить текущие записи на новые, то offset равен 0
        // если добавить, то offset равен количеству уже загруженных записей
        params.offset = replace ? 0 : offset;
        params.limit = RECORDS_LIMIT;

        const response = yield call(api.getRecords, params);

        yield put(successLoadRecords({
            records: response.data,
            allUploaded: response.data.length < RECORDS_LIMIT,
            replace,
        }));
    } catch (err) {
        console.error(err);
        yield put(failureLoadRecords(err));
    }
}

export function* postRecord({ payload }) {
    try {
        yield put(showPreloader());
        const [uploadedVideo, uploadedFile] = [
            yield call(api.uploadVideo, payload.video_url[0]),
            yield call(api.uploadFile, payload.image_preview[0]),
        ];
        const type = yield select(getRecordsType);

        const data = {
            ...payload,
            is_full_video: type === 'FULL',
            video_url: uploadedVideo.data.url,
            image_preview: uploadedFile.data.file.url,
            is_published: 0,
        };

        const response = yield call(api.postRecord, data);

        yield put(hidePreloader());

        if (response.data.success) {
            data.id = response.data.data.id;

            yield put(successPostRecord(data));
            yield put(closeModal());
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        console.error(err);
        yield put(failurePostRecord(err));
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось добавить запись. Попробуйте еще раз'));
    }
}

export function* editRecord({ payload }) {
    try {
        const data = {
            ...payload,
        };

        yield put(showPreloader());

        if (typeof payload.image_preview !== 'string') {
            const uploadedFile = yield call(api.uploadFile, payload.image_preview[0]);
            data.image_preview = uploadedFile.data.file.url;
        }

        if (typeof payload.video_url !== 'string') {
            const uploadedVideo = yield call(api.uploadVideo, payload.video_url[0]);
            data.video_url = uploadedVideo.data.url;
        }

        const response = yield call(api.editRecord, data.id, data);

        yield put(hidePreloader());

        if (response.data.success) {
            yield put(successEditRecord(data));
            yield put(closeModal());
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        console.error(err);
        yield put(failureEditRecord(err));
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось отредактировать запись. Попробуйте еще раз'));
    }
}

export function* startEditRecord({ payload }) {
    yield put(selectRecord(payload.id));
    yield put(openModal(MODALS.record));
}

export function* playVideo({ payload }) {
    yield put(selectRecord(payload.id));
    yield put(openModal(MODALS.video));
}

export function* publishRecords() {
    try {
        yield put(showPreloader());

        const records = yield select(getUnpublishedRecords);
        const ids = records.map((record) => record.id);

        const response = yield call(api.publishRecords, { records: ids });

        yield put(hidePreloader());

        if (response.data.success) {
            yield put(successPublishRecords(ids));
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        console.error(err);
        yield put(failurePublishRecords(err));
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось опубликовать записи. Попробуйте еще раз'));
    }
}

export function* initPage() {
    yield call(getPrograms);
    yield call(getRecords, { payload: { replace: true } });
}

export function* initData() {
    const watcher = yield takeLatest(OPEN_PAGE, initPage);

    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

// Individual exports for testing
export function* programsData() {
    yield takeLatest(LOAD_PROGRAMS, getPrograms);
    yield takeEvery(DELETE_RECORD, deleteRecord);
    yield takeLatest(LOAD_RECORDS, getRecords);
    yield takeLatest(SET_RECORDS_TYPE, getRecords);
    yield takeLatest(CHANGE_PROGRAM, getRecords);
    yield takeEvery(POST_RECORD, postRecord);
    yield takeEvery(EDIT_RECORD, editRecord);
    yield takeLatest(START_EDIT_RECORD, startEditRecord);
    yield takeLatest(SEARCH_RECORD, getRecords, { payload: { replace: true } });
    yield takeLatest(PLAY_VIDEO, playVideo);
    yield takeLatest(WANT_DELETE_RECORD, wantDeleteRecord);
    yield takeLatest(PUBLISH_RECORDS, publishRecords);
}

// All sagas to be loaded
export default [
    programsData,
    initData,
];
