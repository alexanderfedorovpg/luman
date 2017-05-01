import { createSelector } from 'reselect'

const selectStatsPageDomain = (state) => state.get('statsPage');

const selectCategoryStatsData = createSelector(
    selectStatsPageDomain,
    root => root.get('catstatsdata').toJS()
);
const selectAuthorsStatsData = createSelector(
    selectStatsPageDomain,
    root => root.get('autstatsdata').toJS()
);

export {
    selectCategoryStatsData,
    selectAuthorsStatsData
}
