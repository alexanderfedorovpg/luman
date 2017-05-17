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

export const EDIT_USER_DATA = 'app/ProfilePage/EDIT_USER_DATA';
export const EDIT_USER_DATA_SUCCESS = 'app/ProfilePage/EDIT_USER_DATA_SUCCESS';
export const EDIT_USER_DATA_FAILURE = 'app/ProfilePage/EDIT_USER_DATA_FAILURE';
export const GET_LAST_ACTIONS = 'app/ProfilePage/GET_LAST_ACTIONS';
export const GET_LAST_ACTIONS_SUCCESS = 'app/ProfilePage/GET_LAST_ACTIONS_SUCCESS';
export const GET_LAST_ACTIONS_FAILURE = 'app/ProfilePage/GET_LAST_ACTIONS_FAILURE';
export const ALL_ACTIONS_LOADED = 'app/ProfilePage/ALL_ACTIONS_LOADED';
export const ENABLE_EDIT_PASSWORD = 'app/ProfilePage/ENABLE_EDIT_PASSWORD';

export const tabs = [
    {
        label: 'Профиль пользователя',
        href: '/profile/account',
    },
    {
        label: 'Последние действия',
        href: '/profile/history',
    },
];

export const lastActionsMap = [
    {
        value: 'date',
        label: 'Дата',
    },
    {
        value: 'time',
        label: 'Время',
    },
    {
        value: 'type_event',
        label: 'Событие',
    },
    {
        value: 'session',
        label: 'Сессия',
    },
    {
        value: 'host',
        label: 'Хост',
    },
    {
        value: 'ip',
        label: 'IP',
    },
];

export const LAST_ACTIONS_UPLOAD_NUM = 10;
