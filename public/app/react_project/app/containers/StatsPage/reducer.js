
import Immutable from 'immutable'
import { fromJS, List, Map } from 'immutable'
import {
    LOAD_CATEGORIES_STATS_SUCCESS
} from './constants'

const initialState = fromJS({
    statsdata: []
});


function StatsPageReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_CATEGORIES_STATS_SUCCESS:
            return state.set('statsdata', fromJS(action.payload));

        default:
            return state;
    }
}

export default StatsPageReducer;
