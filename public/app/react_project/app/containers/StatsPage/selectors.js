import { createSelector } from 'reselect'

const selectStatsPageDomain = (state) => state.get('statsPage');

const selectStatsData = createSelector(
    selectStatsPageDomain,
    root => root.get('statsdata').toJS()
);

export {
    selectStatsData
}
