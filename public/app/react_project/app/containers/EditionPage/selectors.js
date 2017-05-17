import { createSelector } from 'reselect';

/**
 * Direct selector to the editionPage state domain
 */
const selectEditionPageDomain = () => (state) => state.get('editionPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by EditionPage
 */

const makeSelectEditionPage = () => createSelector(
  selectEditionPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEditionPage;
export {
  selectEditionPageDomain,
};
