import { createAction } from 'redux-act';

export const fetch = createAction('FETCH_RECORDS');
export const fetched = createAction('FETCH_RECORDS_SUCCESS');
export const fetchError = createAction('FETCH_RECORDS_FAILURE');
export const fetchMore = createAction('FETCH_MORE_RECORDS');

export const changeDateFilter = createAction('CHANGE_DATE_FILTER');

export const setProgram = createAction('SET_RECORDS_PROGRAM');
