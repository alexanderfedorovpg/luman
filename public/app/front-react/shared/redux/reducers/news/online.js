import { createReducer } from 'redux-act'

import { onlineFetched } from 'actions/news'

const initialState = []

export default createReducer({
    [onlineFetched]: (state, payload) => payload
}, initialState)
