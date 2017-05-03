import { createSelector } from 'reselect'

export const selectBroadcastDomain = state => state.broadcast

export const selectBroadcastData = createSelector(
    selectBroadcastDomain,
    root => root.all.data
)

export const selectBroadcast = createSelector(
    selectBroadcastDomain,
    selectBroadcastData,
    (root, list) => root.all.ids.map(id => list[id])
)
