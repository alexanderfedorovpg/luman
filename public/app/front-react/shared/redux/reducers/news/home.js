import { createReducer } from 'redux-act'

import { homeFetched } from 'actions/news'

const initialState = {
    news: [],
    noise: [],
    broadcast: [],
}

export default createReducer({
    [homeFetched]: (state, payload) => payload
}, initialState)
