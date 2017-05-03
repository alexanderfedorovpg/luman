import { createReducer } from 'redux-act'
import _uniq from 'lodash/uniq'

import { fetched } from 'actions/news'

const initialState = {
    ids: [],
    data: {}
}

export default createReducer({
    [fetched]: (state, payload) => ({
        ids: _uniq([
            ...state.ids,
            ...payload.map(v => v.id)
        ]),
        data: payload.reduce((acc, v) => ({ ...acc, [v.id]: v }), state.data)
    })
}, initialState)
