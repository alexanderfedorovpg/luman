import { createReducer } from 'redux-act';
import _uniq from 'lodash/uniq';

import { fetched, setProgram, changeDateFilter } from 'actions/broadcast';

const initialState = {
    ids: [],
    data: {},
    page: 1,
    lastPage: 1,
    program: null,
};

export default createReducer({
    [fetched]: (state, payload) => {
        let ids = payload.data.map(v => v.id);
        const dataBase = payload.replace ? {} : state.data;

        if (!payload.replace) {
            ids = ids.concat(state.ids);
        }

        return {
            ...state,

            ids: _uniq(ids),
            page: payload.page || state.page,
            lastPage: Number.isInteger(payload.lastPage) ? payload.lastPage : state.lastPage,
            data: payload.data.reduce((acc, v) => ({ ...acc, [v.id]: v }), dataBase),
        };
    },
    [setProgram]: (state, payload) => ({
        ...state,
        program: payload,
    }),
}, initialState);
