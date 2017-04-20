import { call, put, takeLatest } from 'redux-saga/effects';
import * as api from 'api';
import {
    programsLoaded,
    loadingProgramsError,
} from './actions';
import {
    LOAD_PROGRAMS,
} from './constants';

export function* getPrograms() {
    try {
        const response = yield call(api.getPrograms);
        const payload = response.data.map((program) => (
            {
                title: program.name,
                date: program.updated_at ? program.updated_at : program.created_at,
                id: program.id,
            }
        ));

        yield put(programsLoaded(payload));
    } catch (err) {
        yield put(loadingProgramsError(err));
    }
}

// Individual exports for testing
export function* programsData() {
    yield takeLatest(LOAD_PROGRAMS, getPrograms);
}

// All sagas to be loaded
export default [
    programsData,
];
