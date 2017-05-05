import { createReducer } from 'redux-act'
import _uniq from 'lodash/uniq'

import { noiseFetched } from 'actions/news'

const initialState = {
    ids: [],
    data: {},
    page: 1,
    lastPage: 1
}

export default createReducer({
    [noiseFetched]: (state, payload) => ({
        ids: _uniq([
            ...state.ids,
            ...payload.data.map(v => v.id)
        ]),
        page: payload.page || state.page,
        lastPage: payload.lastPage || state.lastPage,
        data: payload.data.reduce((acc, v) => ({ ...acc, [v.id]: v }), state.data)
    })
}, initialState)
