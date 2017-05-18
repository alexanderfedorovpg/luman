/*
 *
 * EditionPage reducer
 *
 */

import { fromJS } from 'immutable';
// import {
//     ADD_USER_SUCCESS,
// } from './constants';

const initialState = fromJS({});

function editionPageReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}

export default editionPageReducer;
