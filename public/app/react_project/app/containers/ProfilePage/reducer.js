/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,
    tabs,
} from './constants';

const initialState = fromJS({
    activeTab: tabs[0].value,
});

function profilePageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        default:
            return state;
    }
}

export default profilePageReducer;
