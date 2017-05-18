import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from 'api';
import {
    addUser,
} from 'containers/App/actions';
import {
    ADD_USER,
} from './constants';
import {
    failureAddUser,
} from './actions';

export function* addUserSaga({ payload }) {
    try {
        const response = yield call(api.addUser, payload);
        yield call(api.addUserToGroup, payload.group, response.data.id);

        const data = {
            ...response.data,
            groups: [payload.group],
        };

        yield put(addUser(data));
    } catch (err) {
        yield put(failureAddUser(err));
    }
}

export function* editionPageData() {
    yield takeLatest(ADD_USER, addUserSaga);
}

// All sagas to be loaded
export default [
    editionPageData,
];
