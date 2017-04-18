import { createSelector } from 'reselect';

/**
 * Direct selector to the livePage state domain
 */
const selectLivePageDomain = () => (state) => state.get('livePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by LivePage
 */

const makeSelectLivePage = () => createSelector(
  selectLivePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectLivePage;
export {
  selectLivePageDomain,
};
