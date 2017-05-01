import { createSelector } from 'reselect'

const selectStatsPageDomain = (state) => state.get('categoryStatsPage');

const selectCategoryPageStatsData = createSelector(
    selectStatsPageDomain,
    root => root.get('categories').toJS()
);

const makeSelectType = () => createSelector(
    selectHome,
    (state) => state.get('type')
);


export {
    selectCategoryPageStatsData,
    makeSelectType
}

