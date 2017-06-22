import { createReducer } from 'redux-act';

import { fetchedCoverImg } from 'actions/aside';

const initialState = {
    url: null,
};

export default createReducer({
    [fetchedCoverImg]: (state, payload) => ({
        ...state,
        ...payload,
    }),
}, initialState);
