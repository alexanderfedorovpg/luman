/*
 *
 * EditionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SELECT_USER,
    DESELECT_USER,
} from './constants';

const initialState = fromJS({
    selectedUser: null,
});

function editionPageReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_USER:
            return state.set('selectedUser', action.payload.id);
        case DESELECT_USER:
            return state.set('selectedUser', null);
        default:
            return state;
    }
}

export default editionPageReducer;
