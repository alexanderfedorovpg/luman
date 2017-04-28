import { combineReducers } from 'redux'

import all from './all.js'
import video from './video.js'
import home from './home.js'

export default combineReducers({
    all,
    video,
    home
})
