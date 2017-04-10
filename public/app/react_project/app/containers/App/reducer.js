/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    TOGGLE_MENU,
    CLOSE_MENU,

    LOAD_EDITORS_SUCCESS
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
    }
});

function AppReducer(state = initialState, action) {
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
        return state.set('api-token', null)

    case LOAD_EDITORS_SUCCESS:
        let users = action.payload.reduce((result, item) => ({ ...result, [item.id]: item }), {})
        let editors = action.payload.map(value => value.id)

        return state
            .setIn(['users', 'editors'], editors)
            .updateIn(['users', 'data'], data => {
                return data.merge(fromJS(users))
            })

    default:
        return state;
  }
}

export default AppReducer;
