/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import {
    LOGIN_SUCCESS,
    LOGOUT,
} from 'containers/LoginPage/constants';
import {
    TOGGLE_MENU,
    CLOSE_MENU,
    LOAD_EDITORS_SUCCESS,
    LOAD_USERS_SUCCESS,
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_RUBRICS_SUCCESS,
    SHOW_PRELOADER,
    HIDE_PRELOADER,
    SHOW_INFO,
    HIDE_INFO,
    LOAD_PROGRAMS_SUCCESS,
    groups,
} from './constants';

const initialState = fromJS({
    menuOpen: false,
    'api-token': null,
    users: {
        editors: [],
        data: {},
    },
    current: {
        data: null,
    },
    rubrics: {
        data: [],
    },
    programs: {},
    preloader: false,
    infoModalText: '',
});

function AppReducer(state = initialState, action) {
    let users = {};
    let editors = [];

    switch (action.type) {
        case TOGGLE_MENU:
            return state.set('menuOpen', !state.get('menuOpen'));

        case CLOSE_MENU:
            if (state.get('menuOpen')) {
                return state.set('menuOpen', false);
            }
            return state;

        case LOGIN_SUCCESS:
            return state.set('api-token', action.payload);

        case LOGOUT:
            return initialState.concat();

        case LOAD_CURRENT_USER_SUCCESS:
            return state.setIn(['current', 'data'], fromJS(action.payload));

        case LOAD_EDITORS_SUCCESS:
            users = action.payload.reduce((result, item) => ({ ...result, [item.id]: item }), {});
            editors = action.payload.map((value) => value.id);

            return state
                .setIn(['users', 'editors'], fromJS(editors))
                .updateIn(['users', 'data'], (data) => data.merge(fromJS(users)));

        case LOAD_USERS_SUCCESS:
            users = action.payload.reduce((result, item) => ({ ...result, [item.id]: item }), {});
            editors = action.payload
                .filter((value) => value.groups.indexOf(groups.editor) > -1)
                .map((value) => value.id);

            return state
                .setIn(['users', 'editors'], fromJS(editors))
                .updateIn(['users', 'data'], (data) => data.merge(fromJS(users)));

        case LOAD_RUBRICS_SUCCESS:
            return state.setIn(['rubrics', 'data'], fromJS(action.payload));

        case SHOW_PRELOADER:
            return state.set('preloader', true);

        case HIDE_PRELOADER:
            return state.set('preloader', false);

        case SHOW_INFO:
            return state.set('infoModalText', action.payload.text);

        case HIDE_INFO:
            return state.set('infoModalText', '');

        case LOAD_PROGRAMS_SUCCESS:
            return state.set('programs', fromJS(action.payload.programs));

        default:
            return state;
    }
}

export default AppReducer;
