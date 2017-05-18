import { takeLatest, call, put } from 'redux-saga/effects';
import * as api from 'api';
import {
    addUser,
    showPreloader,
    hidePreloader,
    showInfoModal,
} from 'containers/App/actions';
import {
    ADD_USER,
} from './constants';
import {
    failureAddUser,
} from './actions';

export function* addUserSaga({ payload }) {
    try {
        yield put(showPreloader());
        const response = yield call(api.addUser, payload);
        console.log(response);
        yield call(api.addUserToGroup, payload.group, response.data.id);

        const data = {
            ...response.data,
            groups: [payload.group],
        };

        yield put(addUser(data));
        yield put(hidePreloader());
        yield put(showInfoModal('Пользователь добавлен'));
    } catch (err) {
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось добавить пользователя. Попробуйте еще раз'));
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
