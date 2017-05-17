import { combineReducers } from 'redux'

import top from './top.js'
import noise from './noise.js'
import related from './related.js'
import home from './home.js'
import online from './online.js'

export default combineReducers({
    top,
    noise,
    related,
    home,
    online
})
