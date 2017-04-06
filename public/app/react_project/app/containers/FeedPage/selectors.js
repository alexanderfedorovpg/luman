import { createSelector } from 'reselect';

const selectFeedPageDomain = () => (state) => state.get('feedPage');

const selectFeedList = createSelector(
    selectFeedPageDomain(),
    root => root.get('news').get('data')
)

const selectedFeedId = createSelector(
    selectFeedPageDomain(),
    root => root.get('selectedFeed')
)

const selectedPagination = createSelector(
    selectFeedPageDomain(),
    root => ({
        current: root.getIn(['news', 'current']),
        max: root.getIn(['news', 'max'])
    })
)

const selectedFeed = createSelector(
    selectFeedList,
    selectedFeedId,
    (list, id) => list.find(value => value.get('id') === id)
)

const selectedLoading = createSelector(
    selectFeedPageDomain(),
    root => root.getIn(['news', 'loading'])
)

const selectSearchVars = createSelector(
    selectFeedPageDomain(),
    root => root.getIn(['news', 'search'])
)

const selectFeedParams = createSelector(
    selectSearchVars,
    selectedPagination,
    (search, pagination) => search.set('page', pagination.current).toJS()
)

export {
    selectFeedPageDomain,
    selectFeedList,
    selectedFeed,
    selectedPagination,
    selectedLoading,
    selectSearchVars,
    selectFeedParams
};
