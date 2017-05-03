import { combineReducers } from 'redux'

import news from './news'
import broadcast from './broadcast'
import rubrics from './rubrics'

const rootReducer = combineReducers({
    news,
    broadcast,
    rubrics
})

export default rootReducer
