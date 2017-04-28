/*
 *
 * ProgramsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SET_RECORDS_TYPE,
    CHANGE_PROGRAM,
    LOAD_PROGRAMS_SUCCESS,
    LOAD_RECORDS_SUCCESS,
    PENDING_RECORDS,
    DELETE_RECORD_SUCCESS,
    EDIT_RECORD_SUCCESS,
    POST_RECORD_SUCCESS,
    SEARCH_RECORD,
    OPEN_MODAL,
    CLOSE_MODAL,
    SELECT_RECORD,
    WANT_DELETE_RECORD,
    MODALS,
    recordsTypes,
} from './constants';

const initialState = fromJS({
    recordsType: recordsTypes[0].value,
    selectedProgram: -1,
    programs: {},
    records: [],
    allRecordsUploaded: false,
    loading: true,
    modal: null,
    searchQuery: null,
    pendingToDelete: null,
    selectedRecord: {
        id: null,
        video_url: null,
        program_id: null,
        publish_date: null,
        title: null,
    },
});

function programsPageReducer(state = initialState, action) {
    let recordInd;

    switch (action.type) {
        case SET_RECORDS_TYPE:
            return state.set('recordsType', action.payload.type);

        case CHANGE_PROGRAM:
            return state.set('selectedProgram', action.payload.id);

        case LOAD_PROGRAMS_SUCCESS:
            return state.set('programs', fromJS(action.payload.programs));

        case PENDING_RECORDS:
            return state.set('loading', true);

        case LOAD_RECORDS_SUCCESS:
            if (action.payload.replace) {
                return state
                    .set('records', fromJS(action.payload.records))
                    .set('allRecordsUploaded', action.payload.allUploaded)
                    .set('loading', false);
            }

            return state
                .update('records', (records) => records.concat(action.payload.records))
                .set('allRecordsUploaded', action.payload.allUploaded)
                .set('loading', false);

        case WANT_DELETE_RECORD:
            return state.set('pendingToDelete', action.payload.id);

        case DELETE_RECORD_SUCCESS:
            return state
                .update(
                    'records',
                    (records) => records.filter((record) => record.get('id') !== action.payload.id)
                )
                .set('pendingToDelete', null);

        case POST_RECORD_SUCCESS:
            return state
                .update(
                    'records',
                    (records) => records.unshift(fromJS(action.payload))
                );

        case EDIT_RECORD_SUCCESS:
            recordInd = state.get('records').findIndex(
                (record) => record.get('id') === action.payload.id
            );

            return state
                .setIn(
                    ['records', recordInd],
                    fromJS(action.payload)
                );

        case SELECT_RECORD:
            return state.set('selectedRecord', action.payload.id);

        case OPEN_MODAL:
            return state.set('modal', MODALS[action.payload.modal]);

        case CLOSE_MODAL:
            return state
                .set('modal', null)
                .set('selectedRecord', fromJS({
                    id: null,
                    video_url: null,
                    program_id: null,
                    title: null,
                }));

        case SEARCH_RECORD:
            return state.set('searchQuery', action.payload.query);

        default:
            return state;
    }
}

export default programsPageReducer;
