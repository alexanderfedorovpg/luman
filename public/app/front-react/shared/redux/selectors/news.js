import { selectRubricsData } from 'selectors/rubrics'
import { createSelector } from 'reselect'
import update from 'immutability-helper'

export const selectNewsDomain = state => state.news

export const selectNewsData = createSelector(
    selectNewsDomain,
    root => root.all.data
)
export const selectNews = createSelector(
    selectNewsDomain,
    selectNewsData,
    (root, list) => root.all.ids.map(id => list[id])
)

export const selectNoise = createSelector(
    selectNews,
    news => news.filter(item => item.top <= 4)
)
export const selectRelated = createSelector(
    selectNewsDomain,
    root => root.related
)

export const selectHome = createSelector(
    selectNewsDomain,
    root => root.home
)

// subsets of homenews
export const selectHomeNews = createSelector(
    selectHome,
    home => home.news
)
export const selectHomeNoise = createSelector(
    selectHome,
    home => home.noise
)
export const selectHomeBroadcast = createSelector(
    selectHome,
    selectRubricsData,
    (home, rubrics) => home.broadcast.map(v => (
        update(
            v,
            {
                record: {
                    rubric: {
                        $set: rubrics[v.record.rubric_id]
                    }
                }
            }
        )
    ))
)
