import { combineReducers } from 'redux';

import news from './news';
import broadcast from './broadcast';
import rubrics from './rubrics';
import search from './search';

const rootReducer = combineReducers({
    news,
    broadcast,
    rubrics,
    search,
});

export default rootReducer;
