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
} from './constants'

const initialState = fromJS({
    messages: {
        loading: false,
        data: []
    }
})

function editorPageReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_CHAT_MESSAGES:
            return state.setIn(['messages', 'loading'], true)

        case LOAD_CHAT_MESSAGES_SUCCESS:
            return state
                .setIn(['messages', 'data'], fromJS(action.payload))
                .setIn(['messages', 'loading'], false)

        case LOAD_CHAT_MESSAGES_FAILURE:
            return state
                .setIn(['messages', 'loading'], false)

        case CLEAR_CHAT_MESSAGES:
            return state
                .setIn(['messages', 'data'], [])

        default:
            return state;
    }
}

export default editorPageReducer;
