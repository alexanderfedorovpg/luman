import { createSelector } from 'reselect'

export const selectProgramsDomain = state => state.programs

export const selectProgramsData = createSelector(
    selectProgramsDomain,
    root => root.data
)

export const selectPrograms = createSelector(
    selectProgramsDomain,
    selectProgramsData,
    (root, list) => root.ids.map(id => list[id])
)
