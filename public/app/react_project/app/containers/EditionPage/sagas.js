import { takeLatest, call, put, select } from 'redux-saga/effects';
import * as api from 'api';
import {
    addUser,
    deleteUser,
    editUser,
    showPreloader,
    hidePreloader,
    showInfoModal,
    addGroup,
    editGroup,
    deleteGroup,
} from 'containers/App/actions';
import {
    ADD_USER,
    DELETE_USER,
    EDIT_USER,
    GET_PERMISSIONS,
    ADD_GROUP,
    DELETE_GROUP,
    SELECT_GROUP,
    EDIT_GROUP,
    GET_HISTORY,

    HISTORY_UPLOAD_LIMIT,
} from './constants';
import {
    failureAddUser,
    failureDeleteUser,
    failureEditUser,
    successGetPermissions,
    failureGetPermissions,
    failureAddGroup,
    failureDeleteGroup,
    failureEditGroup,
    successGetHistory,
    failureGetHistory,
    allHistoryLoaded,
    successGetGroupPermissions,
    failureGetGroupPermissions,
} from './actions';

const selectSelectedUser = (state) => state.getIn(['editionPage', 'selectedUser']);
const selectUsers = (state) => state.getIn(['app', 'users', 'data']).toJS();
const selectSelectedGroup = (state) => state.getIn(['editionPage', 'selectedGroup']);

export function* addUserSaga({ payload }) {
    try {
        yield put(showPreloader());
        const response = yield call(api.addUser, payload);
        yield call(api.addUserToGroup, payload.group, response.data.id);

        const data = {
            ...response.data,
            enabled: 1,
            groups: [parseInt(payload.group, 10)],
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
        const { group, id, ...data } = payload;

        if (data.password === '' || data.password === null) {
            delete data.password;
        }

        data.enabled = data.enabled ? 1 : 0;

        yield put(showPreloader());

        const user = {
            ...data,
            id,
        };

        if (group) {
            const groupInt = parseInt(group, 10);
            const users = yield select(selectUsers);

            if (users[id].groups.indexOf(groupInt) === -1) {
                yield call(api.addUserToGroup, groupInt, id);
                user.groups = [groupInt];
            }
        }

        const response = yield call(api.editUser, id, data);

        yield put(editUser(user));
        yield put(hidePreloader());
        yield put(showInfoModal('Данные пользователя успешно изменены'));
    } catch (err) {
        console.error(err);
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось изменить данные пользователя. Попробуйте еще раз'));
        yield put(failureEditUser(err));
    }
}

export function* getPermissionsSaga() {
    try {
        const response = yield call(api.getPermissionsList);
        const data = { byId: {}, ids: [] };

        response.data.forEach((item) => {
            data.byId[item.id] = item;
            data.ids.push(item.id);
        });

        yield put(successGetPermissions(data));
    } catch (err) {
        yield put(failureGetPermissions(err));
    }
}

export function* addGroupSaga({ payload }) {
    try {
        yield put(showPreloader());
        const data = {
            ...payload,
            enabled: 1,
        };
        const response = yield call(api.addGroup, data);

        yield put(addGroup(response.data));
        yield put(hidePreloader());
        yield put(showInfoModal('Группа добавлена'));
    } catch (err) {
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось добавить группу. Попробуйте еще раз'));
        yield put(failureAddGroup(err));
    }
}

export function* getGroupPermissions({ payload }) {
    try {
        const response = yield call(api.getGroupPermissions, payload.id);
        const permissionIds = response.data.map((permission) => permission.id);

        yield put(successGetGroupPermissions(permissionIds));
    } catch (err) {
        yield put(failureGetGroupPermissions(err));
    }
}

// TO-DO: допилить изменение разрешений
export function* editGroupSaga({ payload }) {
    try {
        const { permissions, ...data } = payload;

        data.enabled = data.enabled ? 1 : 0;

        yield put(showPreloader());
        const response = yield call(api.editGroup, data.id, data);

        yield put(editGroup(data));
        yield put(hidePreloader());
        yield put(showInfoModal('Данные группы успешно изменены'));
    } catch (err) {
        console.error(err);
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось изменить данные группы. Попробуйте еще раз'));
        yield put(failureEditGroup(err));
    }
}

export function* deleteGroupSaga({ payload }) {
    try {
        const id = payload.id ? payload.id : yield select(selectSelectedGroup);

        yield put(showPreloader());
        yield call(api.deleteGroup, id);
        yield put(deleteGroup(id));
        yield put(hidePreloader());
        yield put(showInfoModal('Группа успешно удалена'));
    } catch (err) {
        yield put(hidePreloader());
        yield put(showInfoModal('Не удалось удалить группу. Возможно ее нельзя удалить, так как в ней есть пользователи'));
        yield put(failureDeleteGroup(err));
    }
}

const selectHistory = (state) => state.getIn(['editionPage', 'history']).toJS();

export function* getHistorySaga() {
    try {
        const loadedHistory = yield select(selectHistory);

        const response = yield call(api.getLogs, {
            offset: loadedHistory.length,
            limit: HISTORY_UPLOAD_LIMIT,
        });
        yield put(successGetHistory(response.data));
        if (response.data.length < HISTORY_UPLOAD_LIMIT) {
            yield put(allHistoryLoaded());
        }
    } catch (err) {
        console.error(err);
        yield put(failureGetHistory());
    }
}

export function* editionPageData() {
    yield takeLatest(ADD_USER, addUserSaga);
    yield takeLatest(DELETE_USER, deleteUserSaga);
    yield takeLatest(EDIT_USER, editUserSaga);
    yield takeLatest(GET_PERMISSIONS, getPermissionsSaga);
    yield takeLatest(ADD_GROUP, addGroupSaga);
    yield takeLatest(DELETE_GROUP, deleteGroupSaga);
    yield takeLatest(EDIT_GROUP, editGroupSaga);
    yield takeLatest(GET_HISTORY, getHistorySaga);
    yield takeLatest(SELECT_GROUP, getGroupPermissions);
}

// All sagas to be loaded
export default [
    editionPageData,
];
