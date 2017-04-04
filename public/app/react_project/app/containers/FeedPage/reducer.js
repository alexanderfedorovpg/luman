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
        data: []
    },
    selectedFeed: null
});

function feedPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_FEED_SUCCESS:
        return state.setIn(['news', 'data'], fromJS(action.payload.data.data))

    case LOAD_FEED_FAILURE:
        console.log('failure', action.error)
        return state

    case SELECT_FEED:
        return state.set('selectedFeed', action.payload)

    default:
        return state;
  }
}

export default feedPageReducer;
