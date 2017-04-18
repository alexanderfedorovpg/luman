import { combineReducers } from 'redux'

import all, * as allSelectors from './all.js'

/*
 * Selectors
 */

export const getAll = state => allSelectors.getAll(state)

export default combineReducers({
    all
})
