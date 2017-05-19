import { fromJS, Map } from 'immutable'
import {

    LOAD_ARTICLE_SUCCESS,
    CLEAR_ARTICLE
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

        case CLEAR_ARTICLE:
            return state
                .setIn(['article', 'data'], Map())

        default:
            return state;
    }
}

export default editorPageReducer;
