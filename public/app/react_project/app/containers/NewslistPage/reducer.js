/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
    LOAD_NEWSLIST,
    LOAD_NEWSLIST_SUCCESS,
    LOAD_NEWSLIST_FAILURE,

    REJECT_ARTICLE_SUCCESS,

    ACCEPT_ARTICLE_SUCCESS,

    DELETE_ARTICLE_SUCCESS,

    DELEGATE_ARTICLE_SUCCESS,

    SET_FILTER
} from './constants'

const initialState = fromJS({
    news: {
        loading: false,
        data: [],
        showed: JSON.parse(localStorage.getItem('workingShowed')) || [],
        initialLoad: true
    },
    filter: ''
})

function NewslistPageReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_NEWSLIST:
            return state.setIn(['news', 'loading'], true)

        case LOAD_NEWSLIST_SUCCESS:
            let showed = state.getIn(['news', 'data']).map(value => value.get('id'))

            if (!state.getIn(['news', 'initialLoad'])) {
                localStorage.setItem('workingShowed', JSON.stringify(showed.toJS()))
            }
            else {
                showed = state.getIn(['news', 'showed'])
            }

            return state
                .setIn(['news', 'showed'], showed)
                .setIn(['news', 'data'], fromJS(action.payload.data))
                .setIn(['news', 'loading'], false)
                .setIn(['news', 'initialLoad'], false)

        case LOAD_NEWSLIST_FAILURE:
            return state
                .setIn(['news', 'loading'], false)

        case SET_FILTER:
            return state
                .set('filter', action.payload)

        case REJECT_ARTICLE_SUCCESS:
        case ACCEPT_ARTICLE_SUCCESS:
            return state
                .updateIn(['news', 'data'], value => {
                    return value.filter(value => value.get('id') !== action.payload)
                })

        case DELETE_ARTICLE_SUCCESS:
            return state
                .updateIn(['news', 'data'], value => {
                    return value.filter(value => value.get('id') !== action.payload)
                })        

        case DELEGATE_ARTICLE_SUCCESS:
            return state
                .updateIn(['news', 'data'], value => {

                    return value.update(
                        value.findIndex(item =>  item.get('id') === action.payload.id),
                        item => item
                            .set('editor', action.payload.editor)
                            .set('editor_id', action.payload.editor.id)
                    )
                })

        default:
            return state;
    }
}

export default NewslistPageReducer;
