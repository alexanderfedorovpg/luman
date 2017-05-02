import { combineReducers } from 'redux'

import all from './all.js'
import related from './related.js'
import video from './video.js'
import home from './home.js'

export default combineReducers({
    all,
    related,
    video,
    home
})
