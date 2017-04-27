
import Immutable from 'immutable'
import { fromJS, List, Map } from 'immutable'
// import {
//     LOAD_CATEGORIES_STATS_SUCCESS
// } from './constants'

const initialState = fromJS({
    statsdata: []
});


function caregoriesStatsPageReducer(state = initialState, action) {

    switch (action.type) {
        default:
            return state;
    }
}

export default caregoriesStatsPageReducer;
