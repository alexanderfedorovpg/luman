/*
 *
 * LivePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    GET_NEWS_SUCCESS,
    GET_LIVE_SUCCESS,
    SELECT_NEWS,
    LIVE_ON_SUCCESS,
    LIVE_OFF,
} from './constants';

const initialState = fromJS({
    news: {
        byId: {},
        ids: [],
    },
    selected: null,
    live: false,
    streamUrl: null,
});

function livePageReducer(state = initialState, action) {
    switch (action.type) {
        case GET_NEWS_SUCCESS:
            return state.set('news', fromJS(action.payload.news));

        case GET_LIVE_SUCCESS:
            return state.set('streamUrl', action.payload.url);

        case SELECT_NEWS:
            return state.set('selected', action.payload.id);

        case LIVE_ON_SUCCESS:
            return state.set('live', true);

        case LIVE_OFF:
            return state.set('live', false);

        default:
            return state;
    }
}

export default livePageReducer;
