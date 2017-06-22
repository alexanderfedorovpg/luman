import { createReducer } from 'redux-act';
import _uniq from 'lodash/uniq';

import { fetched, setProgram, changeDateFilter } from 'actions/broadcast';

const initialState = {
    ids: [],
    data: {},
    canLoadMore: false,
    program: null,
};

export default createReducer({
    [fetched]: (state, payload) => {
        let ids = payload.data.map(v => v.id);
        let canLoadMore = false;
        const dataBase = payload.replace ? {} : state.data;

        if (!payload.replace) {
            ids = _uniq(state.ids.concat(ids));
        }

        if (ids.length < payload.total) {
            canLoadMore = true;
        }

        return {
            ...state,

            ids,
            canLoadMore,
            data: payload.data.reduce((acc, v) => ({ ...acc, [v.id]: v }), dataBase),
        };
    },
    [setProgram]: (state, payload) => ({
        ...state,
        program: payload,
    }),
}, initialState);
