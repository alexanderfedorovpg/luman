/*
 *
 * ProfilePage constants
 *
 */
import { groups } from 'containers/App/constants';

export const userGroups = {
    [groups.admin]: 'Администратор',
    [groups.editor]: 'Редактор',
    [groups['сommissioning-editor']]: 'Выпускающий',
};

export const CHANGE_TAB = 'app/ProfilePage/CHANGE_TAB';
export const EDIT_USER_DATA = 'app/ProfilePage/EDIT_USER_DATA';
export const EDIT_USER_DATA_SUCCESS = 'app/ProfilePage/EDIT_USER_DATA_SUCCESS';
export const EDIT_USER_DATA_FAILURE = 'app/ProfilePage/EDIT_USER_DATA_FAILURE';
export const GET_LAST_ACTIONS = 'app/ProfilePage/GET_LAST_ACTIONS';
export const GET_LAST_ACTIONS_SUCCESS = 'app/ProfilePage/GET_LAST_ACTIONS_SUCCESS';
export const GET_LAST_ACTIONS_FAILURE = 'app/ProfilePage/GET_LAST_ACTIONS_FAILURE';

export const tabs = [
    {
        title: 'Профиль пользователя',
        value: 'PROFILE',
    },
    {
        title: 'Последние действия',
        value: 'LAST_ACTIONS',
    },
];
