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

const makeSelected = () => createSelector(
    selectEditionPageDomain(),
    (page) => page.get('selectedUser')
);

const selectUsers = createSelector(
    selectAppDomain(),
    (app) => app.get('users').get('data')
);

const makeGetUsers = () => createSelector(
    [selectUsers, makeGetGroups(), makeSelected()],
    (usersImmutable, groupsImmutable, selected) => {
        if (!usersImmutable || !groupsImmutable) {
            return [];
        }

        const users = usersImmutable.toJS();
        const groups = groupsImmutable.toJS();

        function makeGroups(group) {
            return groups.byId[group].name;
        }

        return Object.values(users).map((user) => ({
            id: user.id,
            active: user.id === selected,
            cells: [
                <User className="table-user" data={{ name: user.name, avatar: user.avatar }} />,
                user.groups.map(makeGroups).join(', '),
                user.enabled === 1 ? 'Активен' : <span className="table-blocked">Заблокирован</span>,
            ],
        }));
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

const selectSelectedUser = createSelector(
    [makeSelected(), selectUsers],
    (selected, usersImmutable) => {
        if (!selected || !usersImmutable) {
            return null;
        }

        const users = usersImmutable.toJS();

        return users[selected];
    }
);

const makeUserInfo = () => createSelector(
    selectSelectedUser,
    (user) => {
        if (!user) {
            return {};
        }

        return {
            avatar: user.avatar,
            name: user.name,
        };
    }
);

const makeUserAccount = () => createSelector(
    selectSelectedUser,
    (user) => {
        if (!user) {
            return {};
        }

        return {
            email: user.email,
            login: user.login,
            password: null,
            group: String(user.groups[0]),
            enabled: user.enabled === 1,
        };
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
    makeUserAccount,
    makeSelected,
    makeUserInfo,
};
