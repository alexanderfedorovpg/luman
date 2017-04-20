import { createReducer } from 'redux-act'

import { fetched } from 'actions/news'

const initialState = []

/*
 * Selectors
 */

export const getAll = state => state

export default createReducer({
    [fetched]: (state, payload) => payload
}, initialState)
