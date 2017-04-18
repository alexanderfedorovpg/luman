import { createSelector } from 'reselect';

/**
 * Direct selector to the programsPage state domain
 */
const selectProgramsPageDomain = () => (state) => state.get('programsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ProgramsPage
 */

const makeSelectProgramsPage = () => createSelector(
  selectProgramsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectProgramsPage;
export {
  selectProgramsPageDomain,
};
