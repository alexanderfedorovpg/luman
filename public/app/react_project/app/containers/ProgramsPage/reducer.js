/*
 *
 * ProgramsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SET_FILTER,
    filters,
} from './constants';

const initialState = fromJS({
    filter: filters[0].value,
});

function programsPageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER:
            return state.set('filter', action.payload);
        default:
            return state;
    }
}

export default programsPageReducer;
