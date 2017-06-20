import { combineReducers } from 'redux';

import all from './all';
import filters from './filters';

export default combineReducers({
    all,
    filters,
});
