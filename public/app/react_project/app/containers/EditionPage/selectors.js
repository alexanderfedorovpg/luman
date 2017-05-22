import React from 'react';
import { createSelector } from 'reselect';
import User from 'components/User';
import { makeGetGroups } from 'containers/App/selectors';
import { historyMap } from './constants';
/**
 * Direct selector to the editionPage state domain
 */
const selectEditionPageDomain = () => (state) => state.get('editionPage');
const selectAppDomain = () => (state) => state.get('app');

/**
 * Other specific selectors
 */

const makeSelectedUser = () => createSelector(
    selectEditionPageDomain(),
    (page) => page.get('selectedUser')
);

const selectGroup = createSelector(
    selectEditionPageDomain(),
    (page) => page.get('selectedGroup')
);

const makeSelectedGroup = () => createSelector(
    selectGroup,
    (group) => group.get('id')
);

const selectUsers = createSelector(
    selectAppDomain(),
    (app) => app.get('users').get('data')
);

const makeGetUsers = () => createSelector(
    [selectUsers, makeGetGroups(), makeSelectedUser()],
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

const makeGetGroupsTable = () => createSelector(
    [makeGetGroups(), makeSelectedGroup()],
    (groupsImmutable, selected) => {
        if (!groupsImmutable) {
            return [];
        }

        const groups = groupsImmutable.toJS();

        return groups.ids.map((id) => {
            const group = groups.byId[id];

            return {
                id,
                active: id === selected,
                cells: [
                    <User className="table-user" data={{ name: group.name, letterAvatar: group.name[0] }} />,
                    group.users.length,
                    group.enabled === 1 ? 'Активна' : <span className="table-blocked">Заблокирована</span>,
                ],
            };
        });
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

const selectPermissions = createSelector(
    selectEditionPageDomain(),
    (page) => page.get('permissions')
);

const makeCheckboxesFromPermissions = () => createSelector(
    selectPermissions,
    (permissionsImmutable) => {
        if (!permissionsImmutable) {
            return [];
        }

        const permissions = permissionsImmutable.toJS();

        return permissions.ids.map((id) => {
            const permission = permissions.byId[id];

            return {
                value: permission.id,
                label: permission.description,
            };
        });
    }
);

const selectSelectedUser = createSelector(
    [makeSelectedUser(), selectUsers],
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
            id: user.id,
            email: user.email,
            login: user.login,
            password: null,
            group: String(user.groups[0]),
            enabled: user.enabled === 1,
        };
    }
);

const getSelectedGroup = createSelector(
    [makeSelectedGroup(), makeGetGroups()],
    (selected, groupsImmutable) => {
        if (!selected || !groupsImmutable) {
            return null;
        }

        const groups = groupsImmutable.toJS();

        return groups.byId[selected];
    }
);

const makeGroupInfo = () => createSelector(
    getSelectedGroup,
    (group) => {
        if (!group) {
            return {};
        }

        return {
            name: group.name,
            letterAvatar: group.name[0],
        };
    }
);

const selectGroupPermissions = createSelector(
    selectGroup,
    (group) => group.get('permissions')
);

const makeGroupAccount = () => createSelector(
    [getSelectedGroup, selectGroupPermissions],
    (group, permissions) => {
        if (!group) {
            return {};
        }

        return {
            permissions: permissions.toJS().map((item) => String(item)),
            id: group.id,
            enabled: group.enabled === 1,
        };
    }
);

const selectHistory = createSelector(
    selectEditionPageDomain(),
    (page) => page.get('history')
);

const makeHistory = () => createSelector(
    [selectHistory, selectUsers],
    (historyImmutable, usersImmutable) => {
        const history = historyImmutable.toJS();
        const users = usersImmutable.toJS();

        return history.map((action) => ({
            id: action.id,
            cells: historyMap.map((item) => {
                if (item.value === 'user') {
                    return users[action.user_id].name;
                }

                return action[item.value];
            }),
        }));
    }
);

const makeGetAllHistoryLoaded = () => createSelector(
    selectEditionPageDomain(),
    (page) => page.get('allHistoryLoaded'),
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
    makeGetGroupsTable,
    makeRadioButtonsFromGroups,
    makeCheckboxesFromPermissions,
    makeSelectedUser,
    makeSelectedGroup,
    makeUserInfo,
    makeUserAccount,
    makeGroupInfo,
    makeGroupAccount,
    makeHistory,
    makeGetAllHistoryLoaded,
};
