/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
} from './constants';

import {
    LOGIN_SUCCESS,
    LOGOUT
} from '../LoginPage/constants';

const initialState = fromJS({
    menuOpen: false
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
        return state.set('menuOpen', !state.get('menuOpen'))
        break

    case 'CLOSE_MENU':
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

    default:
        return state;
  }
}

export default AppReducer;
