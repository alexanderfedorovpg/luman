import { createAction } from 'redux-act'

export const fetch = createAction('FETCH_RUBRICS')
export const fetched = createAction('FETCH_RUBRICS_SUCCESS')
export const fetchError = createAction('FETCH_RUBRICS_FAILURE')
