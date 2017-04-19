import { combineReducers } from 'redux'

import news, { getAll, getVideo } from './news'

const rootReducer = combineReducers({
    news
})

export const getNews = state => getAll(state.news)
export const getVideoNews = state => getVideo(state.news)

export default rootReducer
