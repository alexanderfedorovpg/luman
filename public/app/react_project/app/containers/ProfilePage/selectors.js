import React from 'react';
import { createSelector } from 'reselect';
import { FormattedDate } from 'react-intl';
import { getCurrentUserData, makeGetGroups } from 'containers/App/selectors';
import { lastActionsMap } from './constants';

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

const makeAccountFormInitialValues = () => createSelector(
    getCurrentUserData,
    (userImmutable) => {
        if (!userImmutable) {
            return {};
        }

        const user = userImmutable.toJS();
        const userName = user.name.split(' ');
        const url = user.avatar && user.avatar.url ? user.avatar.url : null;

        return {
            firstname: userName[0],
            lastname: userName[1],
            email: user.email,
            login: user.login,
            avatar: url,
            password: null,
        };
    }
);

const makeProfileStats = () => createSelector(
    [getCurrentUserData, makeGetGroups()],
    (userImmutable, groupsImmutable) => {
        const data = [];

        if (!userImmutable || !groupsImmutable) {
            return data;
        }

        const user = userImmutable.toJS();
        const groups = groupsImmutable.toJS();

        function makeStatsItem(key, name, value) {
            data.push({ key, name, value });
        }

        function makeGroups(group) {
            return groups.byId[group].name;
        }

        makeStatsItem(
            'createdAt',
            'Добавлен',
            <FormattedDate
                value={user.created_at}
                year="numeric"
                month="long"
                day="2-digit"
            />
        );
        // makeStatsItem('totalArticles', 'Всего написано статей', 0);
        makeStatsItem('group', 'Группа', user.groups.map(makeGroups).join(', '));
        // makeStatsItem('edited', 'Отредактировано', 0);
        makeStatsItem('enabled', 'Статус профиля', user.enabled > 0 ? 'Активный' : 'Не активный');


        return data;
    }
);

const selectLastActions = createSelector(
    selectProfilePageDomain(),
    (page) => page.get('lastActions')
);

const makeLastActions = () => createSelector(
    selectLastActions,
    (lastActionsImmutable) => {
        const lastActions = lastActionsImmutable.toJS();

        return lastActions.map((action) => lastActionsMap.map((item) => action[item.value]));
    }
);

const makeGetCanEditPassword = () => createSelector(
    selectProfilePageDomain(),
    (page) => page.get('canEditPassword')
);

const makeGetAllHistoryLoaded = () => createSelector(
    selectProfilePageDomain(),
    (page) => page.get('allActionsLoaded'),
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
    makeAccountFormInitialValues,
    makeProfileStats,
    makeLastActions,
    makeGetCanEditPassword,
    makeGetAllHistoryLoaded,
};
