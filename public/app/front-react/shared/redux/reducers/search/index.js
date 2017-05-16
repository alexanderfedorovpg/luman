import { createReducer } from 'redux-act';

import {
    setInitialState,
    search,
    searchError,
    searchSuccess,
    changeSearchCategory,
} from 'actions/search';

const initialState = {
    results: [],
    query: '',
    category: 'all',
    loading: true,
};

export default createReducer({
    [setInitialState]: (state, payload) => ({
        ...state,
        ...payload,
    }),
    [search]: state => ({
        ...state,
        results: [],
        loading: true,
    }),
    [searchSuccess]: (state, payload) => ({
        ...state,
        ...payload,
        loading: false,
    }),
    [searchError]: state => ({
        ...state,
        loading: false,
    }),
    [changeSearchCategory]: (state, payload) => ({
        ...state,
        category: payload,
    }),
}, initialState);
