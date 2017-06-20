import { createReducer } from 'redux-act';

import { changeDateFilter } from 'actions/broadcast';

const initialState = {
    startDate: null,
    endDate: null,
};

export default createReducer({
    [changeDateFilter]: (state, payload) => ({
        ...state,
        startDate: payload.start,
        endDate: payload.end,
    }),
}, initialState);
