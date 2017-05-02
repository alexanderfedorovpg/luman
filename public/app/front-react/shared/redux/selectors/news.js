import { selectRubricsData } from 'selectors/rubrics'
import update from 'immutability-helper'

export const selectNewsDomain = state => state.news

export const selectNewsData = state => selectNewsDomain(state).all.data
export const selectNews = state => (
    selectNewsDomain(state).all.ids
        .map(id => selectNewsData(state)[id])
)
export const selectById = (state, id) => selectNewsData(state)[id] || null

export const selectNoise = state => (
    selectNews(state).filter(item => item.top < 5)
)
export const selectRelated = state => selectNewsDomain(state).related

export const selectVideoNews = state => selectNewsDomain(state).video

export const selectHome = state => selectNewsDomain(state).home

// subsets of homenews
export const selectHomeNews = state => selectHome(state).news
export const selectHomeNoise = state => selectHome(state).noise
export const selectHomeBroadcast = state => (
    selectHome(state).broadcast.map(v => (
        update(
            v,
            {
                record: {
                    rubric: {
                        $set: selectRubricsData(state)[v.record.rubric_id]
                    }
                }
            }
        )
    ))
)
