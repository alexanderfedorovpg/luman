import { createSelector } from 'reselect';

/**
 * Direct selector to the feedPage state domain
 */
const selectFeedPageDomain = () => (state) => state.get('feedPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by FeedPage
 */

const makeSelectFeedPage = () => createSelector(
  selectFeedPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectFeedPage;
export {
  selectFeedPageDomain,
};
