import { createReducer } from 'redux-act'

import { fetched } from 'actions/news'

const initialState = {
    ids: [],
    data: {}
}

export default createReducer({
    [fetched]: (state, payload) => ({
        ids: payload.map(v => v.id),
        data: payload.reduce((acc, v) => ({ ...acc, [v.id]: v }), {})
    })
}, initialState)
