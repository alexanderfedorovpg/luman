/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_LAST_ACTIONS_SUCCESS,
    ALL_ACTIONS_LOADED,
    ENABLE_EDIT_PASSWORD,
} from './constants';

const initialState = fromJS({
    lastActions: [],
    allActionsLoaded: false,
    canEditPassword: false,
});

function profilePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_LAST_ACTIONS_SUCCESS:
            return state.update(
                'lastActions',
                (actions) => actions.concat(action.payload.actions)
            );
        case ALL_ACTIONS_LOADED:
            return state.set('allActionsLoaded', true);
        case ENABLE_EDIT_PASSWORD:
            return state.set('canEditPassword', true);
        default:
            return state;
    }
}

export default profilePageReducer;
