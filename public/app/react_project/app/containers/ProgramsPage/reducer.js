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
    DELETE_RECORD_SUCCESS,
    recordsTypes,
} from './constants';

const initialState = fromJS({
    recordsType: recordsTypes[0].value,
    rubric: -1,
    programs: [],
    records: [],
    allRecordsUploaded: false,
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
            if (action.payload.replace) {
                return state
                    .set('records', fromJS(action.payload.records))
                    .set('allRecordsUploaded', action.payload.allUploaded);
            }

            return state
                .update('records', (records) => records.concat(action.payload.records))
                .set('allRecordsUploaded', action.payload.allUploaded);

        case DELETE_RECORD_SUCCESS:
            return state.update(
                'records',
                (records) => records.filter((record) => record.get('id') !== action.payload.id)
            );

        default:
            return state;
    }
}

export default programsPageReducer;
