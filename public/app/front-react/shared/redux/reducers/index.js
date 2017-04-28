import { combineReducers } from 'redux'

import news from './news'
import rubrics from './rubrics'

const rootReducer = combineReducers({
    news,
    rubrics
})

export default rootReducer
