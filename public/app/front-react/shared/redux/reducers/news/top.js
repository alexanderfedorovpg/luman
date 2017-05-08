import { createReducer } from 'redux-act'
import _uniq from 'lodash/uniq'

import { topFetched, setTopRubric } from 'actions/news'

const initialState = {
    ids: [],
    data: {},
    page: 1,
    lastPage: 1,
    rubric: null
}

export default createReducer({
    [topFetched]: (state, payload) => ({
        ...state,

        ids: _uniq([
            ...state.ids,
            ...payload.data.map(v => v.id)
        ]),
        page: payload.page || state.page,
        lastPage: Number.isInteger(payload.lastPage) ? payload.lastPage : state.lastPage,
        data: payload.data.reduce((acc, v) => ({ ...acc, [v.id]: v }), state.data)
    }),
    [setTopRubric]: (state, payload) => ({
        ...state,
        rubric: payload
    })
}, initialState)
