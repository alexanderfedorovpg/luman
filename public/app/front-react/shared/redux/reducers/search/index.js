import { createReducer } from 'redux-act';

import { searchSuccess } from 'actions/search';

const initialState = {
    results: [],
    query: '',
};

export default createReducer({
    [searchSuccess]: (state, payload) => payload,
}, initialState);
