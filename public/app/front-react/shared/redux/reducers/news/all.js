import { createReducer } from 'redux-act'

import { fetched } from 'actions/news'

const initialState = []

export default createReducer({
    [fetched]: (state, payload) => payload
}, initialState)
