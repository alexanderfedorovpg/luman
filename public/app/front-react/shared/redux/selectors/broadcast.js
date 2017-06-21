import { createSelector } from 'reselect';

export const selectBroadcastDomain = state => state.broadcast;

export const selectBroadcastData = createSelector(
    selectBroadcastDomain,
    root => root.all.data,
);

export const selectBroadcastIds = createSelector(
    selectBroadcastDomain,
    root => root.all.ids,
);

export const selectBroadcast = createSelector(
    selectBroadcastIds,
    selectBroadcastData,
    (ids, list) => ids.map(id => list[id]),
);

export const selectCanLoad = createSelector(
    selectBroadcastDomain,
    root => root.all.canLoadMore,
);

export const selectFilters = createSelector(
    selectBroadcastDomain,
    root => root.filters,
);

export const selectProgram = createSelector(
    selectBroadcastDomain,
    root => root.all.program,
);
