import { createAction } from 'redux-act'

export const fetch = createAction('FETCH_RECORDS')
export const fetched = createAction('FETCH_RECORDS_SUCCESS')
export const fetchError = createAction('FETCH_RECORDS_FAILURE')
