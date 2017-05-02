/*
 *
 * LivePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_NEWS_SUCCESS,
    NEWS_TO_LIVE,
    LIVE_ON,
    LIVE_OFF,
} from './constants';

const initialState = fromJS({
    news: {
        byId: {},
        ids: [],
    },
    selected: null,
    live: false,
});

function livePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NEWS_SUCCESS:
            return state.set('news', fromJS(action.payload.news));

        case NEWS_TO_LIVE:
            return state.set('selected', action.payload.id);

        case LIVE_ON:
            return state.set('live', true);

        case LIVE_OFF:
            return state.set('live', false);

        default:
            return state;
    }
}

export default livePageReducer;
