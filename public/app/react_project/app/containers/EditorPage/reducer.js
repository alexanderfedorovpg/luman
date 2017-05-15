/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable'
import {

    LOAD_ARTICLE_SUCCESS
} from './constants'

const initialState = fromJS({
    article: {
        data: {}
    }
})

function editorPageReducer(state = initialState, action) {

    switch (action.type) {

        case LOAD_ARTICLE_SUCCESS:
            return state
                .setIn(['article', 'data'], fromJS(action.payload))

        default:
            return state;
    }
}

export default editorPageReducer;
