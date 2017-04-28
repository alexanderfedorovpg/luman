import { createReducer } from 'redux-act'

import { videoFetched } from 'actions/news'

const initialState = []

export default createReducer({
    [videoFetched]: (state, payload) => payload
}, initialState)
