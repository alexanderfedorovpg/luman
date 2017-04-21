

import { fromJS } from 'immutable';
import {
    LOAD_FEED,
    LOAD_FEED_SUCCESS,
    LOAD_FEED_FAILURE,

    SELECT_FEED,

    SET_FILTERS,
    SET_FILTER,

    HIDE_FEED_ITEM_SUCCESS,

    FEED_TO_WORK_SUCCESS,

    filters
} from './constants';

const initialState = fromJS({
    filter: filters[0],
    news: {
        search: {},
        loading: false,
        current: 1,
        max: 1,
        data: []
    },
    selectedFeed: null
});

function constructorPageReducer(state = initialState, action) {
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

    case FEED_TO_WORK_SUCCESS:
        return state.set('selectedFeed', null)

    case SET_FILTERS:
        return state.mergeIn(['news', 'search'], action.payload)

    case SET_FILTER:
        return state.set('filter', fromJS(action.payload));

    case HIDE_FEED_ITEM_SUCCESS:
        return state
            .updateIn(['news', 'data'], value => {
                return value.filter(value => value.get('id') !== action.payload)
            })

    default:
        return state;
  }
}

export default constructorPageReducer;
