import { createSelector } from 'reselect'
import update from 'immutability-helper'

export const selectNewsDomain = state => state.news

export const selectTopData = createSelector(
    selectNewsDomain,
    root => root.top.data
)
export const selectTop = createSelector(
    selectNewsDomain,
    selectTopData,
    (root, list) => root.top.ids.map(id => list[id])
)
export const selectTopPagination = createSelector(
    selectNewsDomain,
    (root, list) => ({
        page: root.top.page,
        lastPage: root.top.lastPage,
    })
)
export const selectTopRubric = createSelector(
    selectNewsDomain,
    root => root.top.rubric
)

export const selectNoiseData = createSelector(
    selectNewsDomain,
    root => root.noise.data
)
export const selectNoiseIds = createSelector(
    selectNewsDomain,
    root => root.noise.ids
)
export const selectNoise = createSelector(
    selectNoiseIds,
    selectNoiseData,
    (ids, data) => ids.map(id => data[id])
)
export const selectNoisePagination = createSelector(
    selectNewsDomain,
    (root, list) => ({
        page: root.noise.page,
        lastPage: root.noise.lastPage,
    })
)

export const selectRelated = createSelector(
    selectNewsDomain,
    root => root.related
)

export const selectOnline = createSelector(
    selectNewsDomain,
    root => root.online
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
export const selectHomeWar = createSelector(
    selectHome,
    home => home.war
)
export const makeSelectHomeNewsByCategory = category => (
    createSelector(
        selectHomeNews,
        selectHomeWar,
        (news, war) => [...news, ...war].filter(v => v.category.id == category)
    )
)
export const selectHomeNoise = createSelector(
    selectHome,
    home => home.noise
)
export const selectHomeBroadcast = createSelector(
    selectHome,
    home => home.broadcast
)
export const selectWarMode = createSelector(
    selectHome,
    home => home.options.war
)
export const selectWarTitle = createSelector(
    selectHome,
    home => home.options.title
)
