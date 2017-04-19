import { createReducer } from 'redux-act'

import { videoFetched } from 'actions/news'

const initialState = []

/*
 * Selectors
 */

export const getAll = state => state

export default createReducer({
    [videoFetched]: (state, payload) => payload
}, initialState)
