/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable'
import {
    LOAD_CHAT_MESSAGES,
    LOAD_CHAT_MESSAGES_SUCCESS,
    LOAD_CHAT_MESSAGES_FAILURE,

    CLEAR_CHAT_MESSAGES,

    LOAD_ARTICLE_SUCCESS
} from './constants'

const initialState = fromJS({
    chat: {
        messages: {
            loading: false,
            data: []
        }
    },
    article: {
        data: {}
    }
})

function editorPageReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_CHAT_MESSAGES:
            return state.setIn(['chat', 'messages', 'loading'], true)

        case LOAD_CHAT_MESSAGES_SUCCESS:
            return state
                .setIn(['chat', 'messages', 'data'], fromJS(action.payload))
                .setIn(['chat', 'messages', 'loading'], false)

        case LOAD_CHAT_MESSAGES_FAILURE:
            return state
                .setIn(['chat', 'messages', 'loading'], false)

        case CLEAR_CHAT_MESSAGES:
            return state
                .setIn(['chat', 'messages', 'data'], [])

        case LOAD_ARTICLE_SUCCESS:
            return state
                .setIn(['article', 'data'], fromJS(action.payload))

        default:
            return state;
    }
}

export default editorPageReducer;
