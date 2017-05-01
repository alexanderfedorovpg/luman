import { createSelector } from 'reselect';

const selectStatsPageDomain = () => (state) => state.get('categoryStatsPage');

const selectCategoryPageStatsData = createSelector(
    selectStatsPageDomain(),
    root => root.get('categories').toJS()
);

const makeSelectType = () => createSelector(
    selectStatsPageDomain(),
    (state) => state.get('category')
);


export {
    selectCategoryPageStatsData,
    makeSelectType
}

