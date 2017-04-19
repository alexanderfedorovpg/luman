import { combineReducers } from 'redux'

import all, * as allSelectors from './all.js'
import video, * as videoSelectors from './video.js'

/*
 * Selectors
 */

export const getAll = state => allSelectors.getAll(state.all)
export const getVideo = state => videoSelectors.getAll(state.video)

export default combineReducers({
    all,
    video
})
