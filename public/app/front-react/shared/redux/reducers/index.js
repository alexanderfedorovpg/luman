import { combineReducers } from 'redux';

import news from './news';
import broadcast from './broadcast';
import rubrics from './rubrics';
import search from './search';
import programs from './programs';

const rootReducer = combineReducers({
    news,
    broadcast,
    rubrics,
    search,
    programs
});

export default rootReducer;
