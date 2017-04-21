import { createSelector } from 'reselect';
import { Map } from 'immutable';

const selectConstructorPageDomain = (state) => state.get('constructorPage');

const makeSelectProgramsPage = () => createSelector(
    selectConstructorPageDomain(),
    (substate) => substate.toJS()
);

const selectFeedList = createSelector(
    selectConstructorPageDomain,
    root => root.get('news').get('data')
)

const selectedFeedId = createSelector(
    selectConstructorPageDomain,
    root => root.get('selectedFeed')
)

const selectedPagination = createSelector(
    selectConstructorPageDomain,
    root => ({
        current: root.getIn(['news', 'current']),
        max: root.getIn(['news', 'max'])
    })
)

const selectedFeed = createSelector(
    selectFeedList,
    selectedFeedId,
    (list, id) => list.find(value => value.get('id') === id, null, Map()).toJS()
)

const selectedLoading = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['news', 'loading'])
)

const selectSearchVars = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['news', 'search'])
)

const selectFeedParams = createSelector(
    selectSearchVars,
    selectedPagination,
    (search, pagination) => search.set('page', pagination.current).toJS()
)

const selectedFilter = createSelector(
    selectConstructorPageDomain,
    root => root.get('filter').toJS()
)

export {
    selectConstructorPageDomain,
    selectFeedList,
    selectedFeed,
    selectedPagination,
    selectedLoading,
    selectSearchVars,
    selectFeedParams,
    selectedFilter
};
