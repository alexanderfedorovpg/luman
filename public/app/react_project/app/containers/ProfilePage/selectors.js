import { createSelector } from 'reselect';
import { tabs } from './constants';

/**
 * Direct selector to the profilePage state domain
 */
const selectProfilePageDomain = () => (state) => state.get('profilePage');

/**
 * Other specific selectors
 */

const makeSelectedTab = () => createSelector(
    selectProfilePageDomain(),
    (page) => page.get('activeTab')
);

/**
 * Default selector used by ProfilePage
 */

const makeSelectProfilePage = () => createSelector(
    selectProfilePageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectProfilePage;
export {
    selectProfilePageDomain,
    makeSelectedTab,
};
