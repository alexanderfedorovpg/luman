/*
 *
 * ProgramsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SET_FILTER,
    LOAD_PROGRAMS_SUCCESS,
    LOAD_PROGRAMS_FAILURE,
    filters,
} from './constants';

const initialState = fromJS({
    filter: filters[0].value,
});

function programsPageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER:
            return state.set('filter', action.payload);
        case LOAD_PROGRAMS_SUCCESS:
            return state.set('programs', action.payload);
        default:
            return state;
    }
}

export default programsPageReducer;
