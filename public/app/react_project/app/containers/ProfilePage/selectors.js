import React from 'react';
import { createSelector } from 'reselect';
import { FormattedDate } from 'react-intl';
import { getCurrentUserData } from 'containers/App/selectors';
import { userGroups } from './constants';

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

        return {
            firstname: userName[0],
            lastname: userName[1],
            email: user.email,
            login: user.login,
            avatar_id: `//${user.avatar_url}`,
            password: '123',
        };
    }
);

const makeProfileStats = () => createSelector(
    getCurrentUserData,
    (userImmutable) => {
        const data = [];

        function makeStatsItem(key, name, value) {
            data.push({ key, name, value });
        }

        function makeGroups(group) {
            return userGroups[group];
        }

        if (!userImmutable) {
            return data;
        }

        const user = userImmutable.toJS();
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
        makeStatsItem('totalArticles', 'Всего написано статей', 0);
        makeStatsItem('group', 'Группа', user.groups.map(makeGroups).join(', '));
        makeStatsItem('edited', 'Отредактировано', 0);
        makeStatsItem('enabled', 'Статус профиля', user.enabled > 0 ? 'Активный' : 'Не активный');

        return data;
    }
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
};
