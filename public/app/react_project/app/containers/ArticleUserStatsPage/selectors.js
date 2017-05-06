import { createSelector } from 'reselect';

const selectStatsPageDomain = () => (state) => state.get('authorsStatsPage');

const selectAuthorStatsPageData = createSelector(
    selectStatsPageDomain(),
    root => root.get('data').toJS()
);

const makeSelectType = () => createSelector(
    selectStatsPageDomain(),
    (state) => state.get('author_id')
);


export {
    selectAuthorStatsPageData,
    makeSelectType
}

