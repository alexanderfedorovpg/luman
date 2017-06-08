import { createReducer } from 'redux-act'

import { commentsFetched } from 'actions/news'

const initialState = []

export default createReducer({
    [commentsFetched]: (state, payload) => payload
}, initialState)
