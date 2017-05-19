import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from 'api';
import {
    addUser,
    deleteUser,
    editUser,
    showPreloader,
    hidePreloader,
    showInfoModal,
} from 'containers/App/actions';
import {
    ADD_USER,
    DELETE_USER,
    EDIT_USER,
} from './constants';
import {
    failureAddUser,
    failureDeleteUser,
    failureEditUser,
} from './actions';

const selectSelectedUser = (state) => state.getIn(['editionPage', 'selectedUser']);

export function* addUserSaga({ payload }) {
    try {
        yield put(showPreloader());
        const response = yield call(api.addUser, payload);
        yield call(api.addUserToGroup, payload.group, response.data.id);

        const data = {
            ...response.data,
            enabled: 1,
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

export function* deleteUserSaga({ payload }) {
    try {
        const id = payload.id ? payload.id : yield select(selectSelectedUser);

        yield put(showPreloader());
        yield call(api.deleteUser, id);
        yield put(deleteUser(id));
        yield put(hidePreloader());
        yield put(showInfoModal('Пользователь удалён. Можете забыть про него'));
    } catch (err) {
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось удалить пользователя. Может и не стоит? ;) Если же без этого никак, то попробуйте еще раз'));
        yield put(failureDeleteUser(err));
    }
}

export function* editUserSaga({ payload }) {
    try {
        const data = { ...payload.data };

        if (data.password === '' || data.password === null) {
            delete data.password;
        }

        data.enabled = data.enabled ? 1 : 0;

        if (data.group) {
            yield call(api.addUserToGroup, data.group, payload.id);
        }

        data.group = [parseInt(data.group, 10)];

        yield put(showPreloader());
        yield call(api.editUser, payload.id, data);

        if ('password' in data) {
            delete data.password;
        }

        data.name = `${data.firstName} ${data.lastName}`;

        yield put(editUser(data));
        yield put(hidePreloader());
        yield put(showInfoModal('Данные пользователя успешно изменены'));
    } catch (err) {
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось изменить данные пользователя. Попробуйте еще раз'));
        yield put(failureEditUser(err));
    }
}

export function* editionPageData() {
    yield takeLatest(ADD_USER, addUserSaga);
    yield takeLatest(DELETE_USER, deleteUserSaga);
    yield takeLatest(EDIT_USER, editUserSaga);
}

// All sagas to be loaded
export default [
    editionPageData,
];
