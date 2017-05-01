
import Immutable from 'immutable'
import { fromJS, List, Map } from 'immutable'
import {
    LOAD_CATEGORIES_PAGE_STATS,
    LOAD_CATEGORIES_PAGE_STATS_SUCCESS,
    CHANGE_CATEGORY
} from './constants'

const initialState = fromJS({
    data: [],
    category: ""
});


function StatsPageReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_CATEGORIES_PAGE_STATS_SUCCESS:
            return state
                .set('data', fromJS(action.payload));
        case CHANGE_CATEGORY:
            return state
                .set('category', fromJS(action.category));
        default:
            return state;
    }
}

export default StatsPageReducer;
