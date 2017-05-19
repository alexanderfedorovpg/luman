/*
 *
 * EditionPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SELECT_USER,
    DESELECT_USER,
    SELECT_GROUP,
    DESELECT_GROUP,
    GET_PERMISSIONS_SUCCESS,
} from './constants';

const initialState = fromJS({
    selectedUser: null,
    selectedGroup: null,
    permissions: [],
});

function editionPageReducer(state = initialState, action) {
    switch (action.type) {
        case SELECT_USER:
            return state.set('selectedUser', action.payload.id);
        case DESELECT_USER:
            return state.set('selectedUser', null);
        case SELECT_GROUP:
            return state.set('selectedGroup', action.payload.id);
        case DESELECT_GROUP:
            return state.set('selectedGroup', null);
        case GET_PERMISSIONS_SUCCESS:
            return state.set('permissions', fromJS(action.payload.permissions));
        default:
            return state;
    }
}

export default editionPageReducer;
