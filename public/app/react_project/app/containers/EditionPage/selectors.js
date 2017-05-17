import React from 'react';
import { createSelector } from 'reselect';
import User from 'components/User';
import { makeGetGroups } from 'containers/App/selectors';

/**
 * Direct selector to the editionPage state domain
 */
const selectEditionPageDomain = () => (state) => state.get('editionPage');
const selectAppDomain = () => (state) => state.get('app');

/**
 * Other specific selectors
 */
const selectUsers = createSelector(
    selectAppDomain(),
    (app) => app.get('users').get('data')
);

const makeGetUsers = () => createSelector(
    [selectUsers, makeGetGroups()],
    (usersImmutable, groupsImmutable) => {
        if (!usersImmutable || !groupsImmutable) {
            return [];
        }

        const users = usersImmutable.toJS();
        const groups = groupsImmutable.toJS();

        function makeGroups(group) {
            return groups.byId[group].name;
        }

        return Object.values(users).map((user) => ([
            <User className="table-user" data={{ name: user.name, avatar: user.avatar }} />,
            user.groups.map(makeGroups).join(', '),
            user.enabled === 1 ? 'Активен' : <span className="table-blocked">Заблокирован</span>,
        ]));
    }
);

const makeRadioButtonsFromGroups = () => createSelector(
    makeGetGroups(),
    (groupsImmutable) => {
        if (!groupsImmutable) {
            return [];
        }

        const groups = groupsImmutable.toJS();

        return groups.ids.map((id) => ({
            value: id,
            label: groups.byId[id].name,
        }));
    }
);

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
    makeGetUsers,
    makeRadioButtonsFromGroups,
};
