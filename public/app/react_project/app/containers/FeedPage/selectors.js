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

const selectedFeed = createSelector(
    selectFeedList,
    selectedFeedId,
    (list, id) => list.find(value => value.get('id') === id)
)

export {
    selectFeedPageDomain,
    selectFeedList,
    selectedFeed
};
