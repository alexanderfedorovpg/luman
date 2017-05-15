import { createAction } from 'redux-act'

export const fetch = createAction('FETCH_PROGRAMS')
export const fetched = createAction('FETCH_PROGRAMS_SUCCESS')
export const fetchError = createAction('FETCH_PROGRAMS_FAILURE')
