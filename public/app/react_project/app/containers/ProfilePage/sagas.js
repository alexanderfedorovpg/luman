import { takeLatest, put, take, call, select } from 'redux-saga/effects';
import * as api from 'api';
import {
    showPreloader,
    hidePreloader,
    showInfoModal,
    editProfile,
} from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
    CHANGE_TAB,
    GET_LAST_ACTIONS,
    EDIT_USER_DATA,
    LAST_ACTIONS_UPLOAD_NUM,
} from './constants';
import {
    successGetLastActions,
    failureGetLastActions,
    successEditUserData,
    failureEditUserData,
    allActionsLoaded,
} from './actions';
import { makeLastActionsSort } from './selectors';

const selectLastActions = (state) => state.getIn(['profilePage', 'lastActions']).toJS();

export function* getLastActions() {
    try {
        const sortData = yield select(makeLastActionsSort());
        const loadedHistory = yield select(selectLastActions);

        const response = yield call(api.getUserLogs, {
            ...sortData,
            offset: loadedHistory.length,
            limit: LAST_ACTIONS_UPLOAD_NUM,
        });
        yield put(successGetLastActions(response.data));
        if (response.data.length < LAST_ACTIONS_UPLOAD_NUM) {
            yield put(allActionsLoaded());
        }
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

        let { avatar, password, password_repeat, ...data } = payload; //eslint-disable-line

        if (password !== null) {
            data.password = password;
        }

        data.avatar_id = null;

        if (typeof avatar === 'string') {
            const currentUser = yield select(selectCurrentUser);
            data.avatar_id = currentUser.avatar.id;
        } else {
            const uploadedAva = yield call(api.uploadFile, avatar[0]);
            data.avatar_id = uploadedAva.data.file.id;
            avatar = uploadedAva.data.file.url;
        }

        yield call(api.editUserProfile, data);
        yield put(successEditUserData());

        const newProfile = {
            name: `${data.firstname} ${data.lastname}`,
            email: data.email,
            login: data.login,
            avatar: {
                url: avatar,
                id: data.avatar_id,
            },
        };

        yield put(editProfile(newProfile));
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
