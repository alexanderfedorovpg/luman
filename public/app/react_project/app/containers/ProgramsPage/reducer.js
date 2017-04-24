/*
 *
 * ProgramsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SET_RECORDS_TYPE,
    CHANGE_RUBRIC,
    LOAD_PROGRAMS_SUCCESS,
    LOAD_RECORDS_SUCCESS,
    recordsTypes,
} from './constants';

const initialState = fromJS({
    recordsType: recordsTypes[0].value,
    rubric: -1,
    programs: [],
    records: [],
});

function programsPageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_RECORDS_TYPE:
            return state.set('recordsType', action.payload.type);
        case CHANGE_RUBRIC:
            return state.set('rubric', action.payload.id);
        case LOAD_PROGRAMS_SUCCESS:
            return state.set('programs', fromJS(action.payload.programs));
        case LOAD_RECORDS_SUCCESS:
            return state.update('records', (records) => records.concat(action.payload.records));
        default:
            return state;
    }
}

export default programsPageReducer;
