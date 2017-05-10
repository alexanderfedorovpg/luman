
import Immutable from 'immutable'
import { fromJS, List, Map } from 'immutable'
import {
    LOAD_CATEGORIES_STATS_SUCCESS,
    LOAD_AUTHORS_STATS_SUCCESS
} from './constants'

const initialState = fromJS({
    catstatsdata: [],
    autstatsdata: [],
});


function StatsPageReducer(state = initialState, action) {

    switch (action.type) {
        case LOAD_CATEGORIES_STATS_SUCCESS:
            return state.set('catstatsdata', fromJS(action.payload));
            break
        case LOAD_AUTHORS_STATS_SUCCESS:
            return state.set('autstatsdata', fromJS(action.payload));
            break;
        default:
            return state;
    }
}

export default StatsPageReducer;
