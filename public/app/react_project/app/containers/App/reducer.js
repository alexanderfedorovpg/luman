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
    EDIT_PROFILE,
    LOAD_RUBRICS_SUCCESS,
    SHOW_PRELOADER,
    HIDE_PRELOADER,
    SHOW_INFO,
    HIDE_INFO,
    LOAD_PROGRAMS_SUCCESS,
    LOAD_GROUPS_SUCCESS,
    ADD_USER,
    DELETE_USER,
    EDIT_USER,
} from './constants';

const initialState = fromJS({
    menuOpen: false,
    'api-token': null,
    users: {
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

        case EDIT_PROFILE:
            return state.mergeIn(['current', 'data'], fromJS(action.payload));

        case LOAD_EDITORS_SUCCESS:
        case LOAD_USERS_SUCCESS:
            users = action.payload.reduce((result, item) => ({ ...result, [item.id]: item }), {});

            return state
                .mergeIn(['users', 'data'], fromJS(users));

        case ADD_USER:
            return state
                .setIn(
                    ['users', 'data', action.payload.id],
                    fromJS(action.payload)
                );

        case DELETE_USER:
            return state
                .deleteIn(['users', 'data', String(action.payload.id)]);

        case EDIT_USER:
            return state
                .updateIn(
                    ['users', 'data', String(action.payload.id)],
                    (user) => user.merge(fromJS(action.payload))
                );

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

        case LOAD_GROUPS_SUCCESS:
            return state.set('groups', fromJS(action.payload.groups));

        default:
            return state;
    }
}

export default AppReducer;
