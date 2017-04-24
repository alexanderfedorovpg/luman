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
} from './actions';
import {
    SET_RECORDS_TYPE,
    CHANGE_RUBRIC,
    OPEN_PAGE,
    LOAD_PROGRAMS,
    DELETE_RECORD,
    LOAD_RECORDS,
    RECORDS_LIMIT,
} from './constants';

const getRecordsType = (state) => state.getIn(['programsPage', 'recordsType']);
const getRecordsOffset = (state) => state.getIn(['programsPage', 'records']).size;
const getRubricId = (state) => state.getIn(['programsPage', 'rubric']);

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

export function* deleteRecord({ payload }) {
    try {
        const response = yield call(api.deleteRecord, payload.id);
        if (response.data.success) {
            yield put(successDeleteRecord(payload.id));
        } else {
            throw new Error(response.statusText);
        }
    } catch (err) {
        yield put(failureDeleteRecord(err));
    }
}

export function* getRecords(action = { payload: {} }) {
    try {
        const params = {};
        const { payload } = action;
        const replace = typeof payload.replace === 'undefined' ? true : payload.replace;

        const [type, rubricId, offset] = yield [
            select(getRecordsType),
            select(getRubricId),
            select(getRecordsOffset),
        ];

        if (rubricId >= 0) {
            params.rubricId = rubricId;
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
    yield takeEvery(SET_RECORDS_TYPE, getRecords);
    yield takeEvery(CHANGE_RUBRIC, getRecords);
}

// All sagas to be loaded
export default [
    programsData,
    initData,
];
