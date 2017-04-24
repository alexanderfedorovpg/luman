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
    successDeleteProgram,
    failureDeleteProgram,
    successLoadRecords,
    failureLoadRecords,
} from './actions';
import {
    OPEN_PAGE,
    LOAD_PROGRAMS,
    DELETE_PROGRAM,
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

export function* deleteProgram({ payload }) {
    try {
        yield call(api.deleteProgram, payload.id);
        yield put(successDeleteProgram(payload.id));
    } catch (err) {
        yield put(failureDeleteProgram(err));
    }
}

export function* getRecords() {
    try {
        const params = {};

        const [type, rubricId, offset] = yield [
            select(getRecordsType),
            select(getRubricId),
            select(getRecordsOffset),
        ];

        if (rubricId >= 0) {
            params.rubricId = rubricId;
        }

        params.fullVideo = type === 'FULL';
        params.offset = offset;
        params.limit = RECORDS_LIMIT;

        const response = yield call(api.getRecords, params);
        yield put(successLoadRecords(response.data));
    } catch (err) {
        yield put(failureLoadRecords(err));
    }
}

export function* initPage() {
    yield [
        call(fetchRubrics),
        call(getPrograms),
    ];

    yield call(getRecords);
}

export function* initData() {
    const watcher = yield takeLatest(OPEN_PAGE, initPage);

    yield take(LOCATION_CHANGE);
    yield cancel(watcher);
}

// Individual exports for testing
export function* programsData() {
    yield takeLatest(LOAD_PROGRAMS, getPrograms);
    yield takeEvery(DELETE_PROGRAM, deleteProgram);
    yield takeLatest(LOAD_RECORDS, getRecords);
}

// All sagas to be loaded
export default [
    programsData,
    initData,
];
