import { takeLatest, put, take, call } from 'redux-saga/effects';
import * as api from 'api';
import { showPreloader, hidePreloader, showInfoModal } from 'containers/App/actions';
import {
    CHANGE_TAB,
    GET_LAST_ACTIONS,
    EDIT_USER_DATA,
} from './constants';
import {
    successGetLastActions,
    failureGetLastActions,
    successEditUserData,
    failureEditUserData,
} from './actions';

export function* getLastActions() {
    try {
        yield put(successGetLastActions([]));
    } catch (err) {
        console.error(err);
        yield put(failureGetLastActions());
    }
}

export function* initLastActions() {
    while (true) {
        const action = yield take(CHANGE_TAB);

        if (action.payload.tab.value === 'LAST_ACTIONS') {
            yield call(getLastActions);
            break;
        }
    }
}

export function* editUserData({ payload }) {
    try {
        yield put(showPreloader());

        const data = { ...payload };

        if (typeof payload.avatar_id !== 'string') {
            const uploadAvaResponse = yield call(api.uploadFile, payload.avatar_id);
            data.avatar_id = uploadAvaResponse.data.file.url;
        }

        yield call(api.editUserProfile, payload);
        yield put(successEditUserData());
        yield put(showInfoModal('Учетные данные успешно изменены'));
        yield put(hidePreloader());
    } catch (err) {
        console.error(err);
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось изменить учетные данные. Попробуйте еще раз'));
        yield put(failureEditUserData());
    }
}

// Individual exports for testing
export function* profileData() {
    yield takeLatest(EDIT_USER_DATA, editUserData);
    yield takeLatest(GET_LAST_ACTIONS, getLastActions);
}

// All sagas to be loaded
export default [
    initLastActions,
    profileData,
];
