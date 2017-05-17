import { fromJS } from 'immutable'
import {

    LOAD_ONLINE_SUCCESS,

    LOAD_COMMENTS_SUCCESS,

    EDIT_COMMENT_SUCCESS,

    SET_COMMENTS_ACTION,
    SET_COMMENT_EDIT,
} from './constants'

const initialState = fromJS({
    news: {
        ids: [],
        data: {}
    },
    comments: {
        ids: [],
        data: {},
        action: null,
        edit: null
    }
})

function translationPageReducer(state = initialState, action) {

    switch (action.type) {

        case LOAD_ONLINE_SUCCESS:
            return state
                .setIn(['news', 'ids'], fromJS(action.payload.map(v=>v.id)))
                .setIn(
                    ['news', 'data'],
                    fromJS(action.payload.reduce((acc, v) => ({ ...acc, [v.id]: v }), {}))
                )

        case LOAD_COMMENTS_SUCCESS:
            return state
                .setIn(['comments', 'ids'], fromJS(action.payload.map(v=>v.id)))
                .setIn(
                    ['comments', 'data'],
                    fromJS(action.payload.reduce((acc, v) => ({ ...acc, [v.id]: v }), {}))
                )

        case SET_COMMENTS_ACTION:
            return state
                .setIn(['comments', 'action'], action.payload)

        case SET_COMMENT_EDIT:
            return state
                .setIn(['comments', 'edit'], action.payload)

        case EDIT_COMMENT_SUCCESS:
            return state
                .setIn(['comments', 'edit'], null)

        default:
            return state;
    }
}

export default translationPageReducer;
