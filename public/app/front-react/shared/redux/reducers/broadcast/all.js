import { createReducer } from 'redux-act'
import _uniq from 'lodash/uniq'

import { fetched, setProgram } from 'actions/broadcast'

const initialState = {
    ids: [],
    data: {},
    page: 1,
    lastPage: 1,
    program: null
}

export default createReducer({
    [fetched]: (state, payload) => ({
        ...state,

        ids: _uniq([
            ...state.ids,
            ...payload.data.map(v => v.id)
        ]),
        page: payload.page || state.page,
        lastPage: Number.isInteger(payload.lastPage) ? payload.lastPage : state.lastPage,
        data: payload.data.reduce((acc, v) => ({ ...acc, [v.id]: v }), state.data)
    }),
    [setProgram]: (state, payload) => ({
        ...state,
        program: payload
    })
}, initialState)
