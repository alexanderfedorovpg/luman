import { createReducer } from 'redux-act'

import { relatedFetched } from 'actions/news'

const initialState = []

export default createReducer({
    [relatedFetched]: (state, payload) => payload
}, initialState)
