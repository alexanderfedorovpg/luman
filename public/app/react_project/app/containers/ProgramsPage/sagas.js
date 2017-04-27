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
import { fetchRubrics } from 'containers/App/sagas';
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
    selectRecord,
    openModal,
    closeModal,
} from './actions';
import {
    SET_RECORDS_TYPE,
    CHANGE_RUBRIC,
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
} from './constants';

const getRecordsType = (state) => state.getIn(['programsPage', 'recordsType']);
const getRecordsOffset = (state) => state.getIn(['programsPage', 'records']).size;
const getRubricId = (state) => state.getIn(['programsPage', 'rubric']);
const getSearchQuery = (state) => state.getIn(['programsPage', 'searchQuery']);

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
        yield put(failureLoadPrograms(err));
    }
}

export function* wantDeleteRecord() {
    yield put(closeModal());
    yield put(openModal(MODALS.confirmRecordDelete));
}

export function* deleteRecord({ payload }) {
    try {
        const response = yield call(api.deleteRecord, payload.id);

        if (response.data.success) {
            yield put(successDeleteRecord(payload.id));
            yield put(closeModal());
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        yield put(failureDeleteRecord(err));
    }
}

export function* getRecords(action = { payload: {} }) {
    try {
        yield put({ type: PENDING_RECORDS });

        const params = {};
        const { payload } = action;
        const replace = typeof payload.replace === 'undefined' ? true : payload.replace;

        const [type, rubricId, offset, search] = yield [
            select(getRecordsType),
            select(getRubricId),
            select(getRecordsOffset),
            select(getSearchQuery),
        ];

        if (rubricId >= 0) {
            params.rubricId = rubricId;
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
        yield put(failureLoadRecords(err));
    }
}

export function* postRecord({ payload }) {
    try {
        const uploadFileResponse = yield call(api.uploadFile, payload.video_url[0]);
        const type = yield select(getRecordsType);

        const data = {
            ...payload,
            is_full_video: type === 'FULL',
            video_url: uploadFileResponse.data.file.url,
        };

        const response = yield call(api.postRecord, data);

        if (response.data.success) {
            data.id = response.data.data.id;

            yield put(successPostRecord(data));
            yield put(closeModal());
        }
    } catch (err) {
        yield put(failurePostRecord(err));
    }
}

export function* editRecord({ payload }) {
    try {
        const data = {
            ...payload,
        };

        if (typeof payload.video_url !== 'string') {
            const uploadFileResponse = yield call(api.uploadFile, payload.video_url[0]);
            data.video_url = uploadFileResponse.data.file.url;
        }

        const response = yield call(api.editRecord, data.id, data);

        if (response.data.success) {
            yield put(successEditRecord(data));
            yield put(closeModal());
        }
    } catch (err) {
        yield put(failureEditRecord(err));
    }
}

export function* startEditRecord({ payload }) {
    yield put(closeModal());
    yield put(selectRecord(payload.id));
    yield put(openModal(MODALS.record));
}

export function* playVideo({ payload }) {
    yield put(closeModal());
    yield put(selectRecord(payload.id));
    yield put(openModal(MODALS.video));
}

export function* initPage() {
    yield [
        call(fetchRubrics),
        call(getPrograms),
    ];

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
    yield takeLatest(CHANGE_RUBRIC, getRecords);
    yield takeEvery(POST_RECORD, postRecord);
    yield takeEvery(EDIT_RECORD, editRecord);
    yield takeLatest(START_EDIT_RECORD, startEditRecord);
    yield takeLatest(SEARCH_RECORD, getRecords, { payload: { replace: true } });
    yield takeLatest(PLAY_VIDEO, playVideo);
    yield takeLatest(WANT_DELETE_RECORD, wantDeleteRecord);
}

// All sagas to be loaded
export default [
    programsData,
    initData,
];
