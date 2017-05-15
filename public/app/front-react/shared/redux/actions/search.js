import { createAction } from 'redux-act';

export const setInitialState = createAction('SEAT_INITIAL_STATE');
export const search = createAction('SEARCH');
export const searchSuccess = createAction('SEARCH_SUCCESS');
export const searchError = createAction('SEARCH_ERROR');
export const changeSearchCategory = createAction('CHANGE_SEARCH_CATEGORY');
