

import { fromJS } from 'immutable';
import {
    LOAD_NEWSLIST,
    LOAD_NEWSLIST_FAILURE,
    LOAD_NEWSLIST_SUCCESS,
} from './constants';

const initialState = fromJS({
    news: {
        search: {},
        loading: false,
        data: [],
    }
});

function constructorPageReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_NEWSLIST:
            return state.setIn(['news', 'loading'], true)

        case LOAD_NEWSLIST_SUCCESS:
            return state
                .setIn(['news', 'data'], fromJS(action.payload.data))
                .setIn(['news', 'loading'], false)

        case LOAD_NEWSLIST_FAILURE:
            return state
                .setIn(['news', 'loading'], false)

        default:
            return state;
    }
}

export default constructorPageReducer;
