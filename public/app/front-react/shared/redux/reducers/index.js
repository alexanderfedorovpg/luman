import { combineReducers } from 'redux';

import news from './news';
import broadcast from './broadcast';
import rubrics from './rubrics';
import search from './search';
import programs from './programs';
import aside from './aside';

const rootReducer = combineReducers({
    news,
    aside,
    broadcast,
    rubrics,
    search,
    programs
});

export default rootReducer;
