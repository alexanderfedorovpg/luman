import { createAction } from 'redux-act';

export const search = createAction('SEARCH');
export const searchSuccess = createAction('SEARCH_SUCCESS');
export const searchError = createAction('SEARCH_ERROR');
export const changeSearchCategory = createAction('CHANGE_SEARCH_CATEGORY');
