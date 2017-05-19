/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    LOAD_READY_NEWS,
    LOAD_READY_NEWS_SUCCESS,
    LOAD_READY_NEWS_FAILURE,

    DELETE_ARTICLE_SUCCESS,

    SET_FILTERS,

    PUBLISH_ARTICLE_SUCCESS
} from './constants';

const initialState = fromJS({
    news: {
        search: {},
        loading: false,
        data: [],
        showed: JSON.parse(localStorage.getItem('readyShowed')) || [],
        initialLoad: true
    }
});

function readyPageReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_READY_NEWS:
            return state.setIn(['news', 'loading'], true)

        case LOAD_READY_NEWS_SUCCESS:
            let showed = state.getIn(['news', 'data']).map(value => value.get('id'))

            if (!state.getIn(['news', 'initialLoad'])) {
                localStorage.setItem('readyShowed', JSON.stringify(showed.toJS()))
            }
            else {
                showed = state.getIn(['news', 'showed'])
            }

            return state
                .setIn(['news', 'showed'], showed)
                .setIn(['news', 'data'], fromJS(action.payload))
                .setIn(['news', 'loading'], false)
                .setIn(['news', 'initialLoad'], false)

        case LOAD_READY_NEWS_FAILURE:
            return state
                .setIn(['news', 'loading'], false)

        case SET_FILTERS:
            return state.mergeIn(['news', 'search'], action.payload)

        case PUBLISH_ARTICLE_SUCCESS:
            return state
                .updateIn(['news', 'data'], value => {
                    return value.update(
                        value.findIndex(item => item.get('id') == action.payload),
                        item => item
                            .set('is_publish', '1')
                            .set('publish_date', new Date())
                    )
                })
                
        case DELETE_ARTICLE_SUCCESS:
            return state
                .updateIn(['news', 'data'], value => {
                    return value.filter(value => value.get('id') !== action.payload)
                })

        default:
            return state;
    }
}

export default readyPageReducer;
