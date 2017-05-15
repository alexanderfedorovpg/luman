/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    CHANGE_TAB,
    GET_LAST_ACTIONS_SUCCESS,
    ALL_ACTIONS_LOADED,
    ENABLE_EDIT_PASSWORD,
    tabs,
} from './constants';

const initialState = fromJS({
    activeTab: tabs[0].value,
    lastActions: [],
    allActionsLoaded: false,
    canEditPassword: false,
});

function profilePageReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TAB:
            return state.set('activeTab', action.payload.tab.value);
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
