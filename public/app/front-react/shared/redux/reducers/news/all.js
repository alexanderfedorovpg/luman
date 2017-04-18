import { createReducer } from 'redux-act'

import { fetch } from 'actions/news'

const initialState = []

/*
 * Selectors
 */

export const getAll = state => state

export default createReducer({
}, initialState)
