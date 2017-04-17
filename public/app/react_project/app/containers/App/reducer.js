/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    TOGGLE_MENU,
    CLOSE_MENU,

    LOAD_EDITORS_SUCCESS,

    LOAD_USERS_SUCCESS,

    LOAD_CURRENT_USER_SUCCESS,

    LOAD_RUBRICS_SUCCESS,

    groups
} from './constants';

import {
    LOGIN_SUCCESS,
    LOGOUT
} from 'containers/LoginPage/constants';

const initialState = fromJS({
    menuOpen: false,
    'api-token': null,
    users: {
        editors: [],
        data: {}
    },
    current: {
        data: null
    },
    rubrics: {
        data: []
    }
});

function AppReducer(state = initialState, action) {
    let users = {}
    let editors = []

    switch (action.type) {
        case TOGGLE_MENU:
            return state.set('menuOpen', !state.get('menuOpen'))
            break

        case CLOSE_MENU:
            if (state.get('menuOpen')) {
                return state.set('menuOpen', false)
            }
            else {
                return state
            }
            break

        case LOGIN_SUCCESS:
            return state.set('api-token', action.payload)


        case LOGOUT:
            return initialState.concat()

        case LOAD_CURRENT_USER_SUCCESS:
            return state.setIn(['current', 'data'], fromJS(action.payload))

        case LOAD_EDITORS_SUCCESS:
            users = action.payload.reduce((result, item) => ({ ...result, [item.id]: item }), {})
            editors = action.payload.map(value => value.id)

            return state
                .setIn(['users', 'editors'], editors)
                .updateIn(['users', 'data'], data => {
                    return data.merge(fromJS(users))
                })

        case LOAD_USERS_SUCCESS:
            users = action.payload.reduce((result, item) => ({ ...result, [item.id]: item }), {})
            editors = action.payload
                .filter(value => value.groups.indexOf(groups.editor) > -1)
                .map(value => value.id)

            return state
                .setIn(['users', 'editors'], editors)
                .updateIn(['users', 'data'], data => {
                    return data.merge(fromJS(users))
                })

        case LOAD_RUBRICS_SUCCESS:
            return state.setIn(['rubrics', 'data'], fromJS(action.payload))

        default:
            return state;
    }
}

export default AppReducer;
