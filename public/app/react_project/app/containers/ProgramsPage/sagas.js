import {
    call,
    put,
    select,
    takeLatest,
    takeEvery,
} from 'redux-saga/effects';
import omit from 'lodash/omit';
import * as api from 'api';
import { getPrograms } from 'containers/App/sagas';
import { showPreloader, hidePreloader, showInfoModal } from 'containers/App/actions';
import {
    successDeleteRecord,
    failureDeleteRecord,
    successLoadRecords,
    failureLoadRecords,
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
    DELETE_RECORD,
    LOAD_RECORDS,
    PENDING_RECORDS,
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

export function* wantDeleteRecord() {
    yield put(openModal(MODALS.confirmRecordDelete));
}

export function* deleteRecord({ payload }) {
    try {
        yield put(showPreloader());
        yield put(closeModal());

        yield call(api.deleteRecord, payload.id);
        yield put(hidePreloader());
        yield put(successDeleteRecord(payload.id));
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

        // params.fullVideo = type === 'FULL';

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

export function* editRecord({ payload }) {
    try {
        const data = omit(payload, ['video', 'video_preview']);
        const needUploadVideo = typeof payload.video !== 'string';
        const needUploadPreview = payload.video_preview && typeof payload.video_preview !== 'string';
        const video = {
            url: payload.video,
            preview: payload.video_preview,
        };

        yield put(showPreloader());

        const [uploadedVideo, uploadedPreview] = yield [
            needUploadVideo ? call(api.uploadVideo, payload.video[0]) : null,
            needUploadPreview ? call(api.uploadFile, payload.video_preview[0]) : null,
        ];

        if (uploadedPreview) {
            data.video_preview = uploadedPreview.data.file.id;
            video.preview = uploadedPreview.data.file.url;
        }

        if (uploadedVideo) {
            data.video = uploadedVideo.data.file.id;
            video.url = uploadedVideo.data.file.url;
        }

        yield call(api.editRecord, data.id, data);

        data.video = video;

        yield put(successEditRecord(data));
        yield put(hidePreloader());
        yield put(closeModal());
        yield put(showInfoModal('Запись успешно отредактирована'));
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

        yield call(api.publishRecords, { records: ids });
        yield put(hidePreloader());
        yield put(successPublishRecords(ids));
    } catch (err) {
        console.error(err);
        yield put(failurePublishRecords(err));
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось опубликовать записи. Попробуйте еще раз'));
    }
}

export function* initPage() {
    yield call(getRecords, { payload: { replace: true } });
}

// Individual exports for testing
export function* programsData() {
    yield takeLatest(OPEN_PAGE, initPage);
    yield takeEvery(DELETE_RECORD, deleteRecord);
    yield takeLatest(LOAD_RECORDS, getRecords);
    yield takeLatest(SET_RECORDS_TYPE, getRecords);
    yield takeLatest(CHANGE_PROGRAM, getRecords);
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
];
