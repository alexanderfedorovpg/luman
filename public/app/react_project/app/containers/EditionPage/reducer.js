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
    ALL_HISTORY_LOADED,
    GET_HISTORY_SUCCESS,
} from './constants';

const initialState = fromJS({
    selectedUser: null,
    selectedGroup: null,
    permissions: [],
    history: [],
    allHistoryLoaded: false,
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
        case ALL_HISTORY_LOADED:
            return state.set('allHistoryLoaded', true);
        case GET_HISTORY_SUCCESS:
            return state.update(
                'history',
                (history) => history.concat(action.payload.history)
            );
        default:
            return state;
    }
}

export default editionPageReducer;
