/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
} from './constants';

const initialState = fromJS({
    menuOpen: false
});

function AppReducer(state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MENU':
        return state.set('menuOpen', !state.get('menuOpen'))

    default:
        return state;
  }
}

export default AppReducer;
