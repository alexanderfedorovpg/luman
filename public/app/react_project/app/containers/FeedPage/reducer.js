/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    LOAD_FEED,
    LOAD_FEED_SUCCESS,
    LOAD_FEED_FAILURE,

    SELECT_FEED
} from './constants';

const initialState = fromJS({
    news: {
        loading: false,
        current: 1,
        max: 1,
        data: []
    },
    selectedFeed: null
});

function feedPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FEED:
        return state.setIn(['news', 'loading'], true)

    case LOAD_FEED_SUCCESS:
        return state
            .setIn(['news', 'data'], fromJS(action.payload.data.data))
            .setIn(['news', 'current'], action.payload.data.current_page)
            .setIn(['news', 'max'], fromJS(action.payload.data.last_page))
            .setIn(['news', 'loading'], false)

    case LOAD_FEED_FAILURE:
        console.log('failure', action.error)
        return state
            .setIn(['news', 'loading'], false)

    case SELECT_FEED:
        return state.set('selectedFeed', action.payload)

    default:
        return state;
  }
}

export default feedPageReducer;
