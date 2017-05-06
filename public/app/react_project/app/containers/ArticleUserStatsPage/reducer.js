
import Immutable from 'immutable'
import { fromJS, List, Map } from 'immutable'
import {
    LOAD_AUTHORS_FAILURE,
    LOAD_AUTHORS_STATS_SUCCESS,
    LOAD_AUTHORS_STATS,
    CHANGE_AUTHOR
} from './constants'

const initialState = fromJS({
    data: [],
    author_id: ""
});


function AuthorsPageReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_AUTHORS_STATS_SUCCESS:
            return state.set('data', fromJS(action.payload));
        case CHANGE_AUTHOR:
            return  state.set('author_id', fromJS(action.author_id));
        default:
            return state;
    }
}

export default AuthorsPageReducer;
