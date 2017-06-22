import { createAction } from 'redux-act'

export const fetchCoverImg = createAction('FETCH_COREV_IMG')

export const fetchedCoverImg = createAction('FETCHED_COREV_IMG')

export const fetchError = createAction('FETCH_COREV_FAILURE');
