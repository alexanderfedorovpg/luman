import { createSelector } from 'reselect'

export const selectRubricsDomain = state => state.rubrics

export const selectRubricsData = createSelector(
    selectRubricsDomain,
    root => root.data
)

export const selectRubrics = createSelector(
    selectRubricsDomain,
    selectRubricsData,
    (root, list) => root.ids.map(id => list[id])
)
