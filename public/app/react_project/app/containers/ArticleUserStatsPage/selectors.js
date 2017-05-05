import { createSelector } from 'reselect'

const selectStatsPageDomain = (state) => state.get('categoriesStatsPage');

const selectCategoryStatsData = createSelector(
    selectStatsPageDomain,
    root => root.get('data').toJS()
);
const selectAuthorsStatsData = createSelector(
    selectStatsPageDomain,
    root => root.get('category').toJS()
);

export {
    selectCategoryStatsData,
    selectAuthorsStatsData
}
