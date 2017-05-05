import { createSelector } from 'reselect';

const selectStatsPageDomain = () => (state) => state.get('categoriesStatsPage');

const selectCategoryPageStatsData = createSelector(
    selectStatsPageDomain(),
    root => root.get('data').toJS()
);

const makeSelectType = () => createSelector(
    selectStatsPageDomain(),
    (state) => state.get('category')
);


export {
    selectCategoryPageStatsData,
    makeSelectType
}

