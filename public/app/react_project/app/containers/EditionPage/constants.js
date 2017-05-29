/*
 *
 * EditionPage constants
 *
 */

export const ADD_USER = 'app/EditionPage/ADD_USER';
export const ADD_USER_FAILURE = 'app/EditionPage/ADD_USER_FAILURE';
export const DELETE_USER = 'app/EditionPage/DELETE_USER';
export const DELETE_USER_FAILURE = 'app/EditionPage/DELETE_USER_FAILURE';
export const EDIT_USER = 'app/EditionPage/EDIT_USER';
export const EDIT_USER_FAILURE = 'app/EditionPage/EDIT_USER_FAILURE';
export const SELECT_USER = 'app/EditionPage/SELECT_USER';
export const DESELECT_USER = 'app/EditionPage/DESELECT_USER';
export const SELECT_GROUP = 'app/EditionPage/SELECT_GROUP';
export const DESELECT_GROUP = 'app/EditionPage/DESELECT_GROUP';
export const GET_GROUP_PERMISSIONS_SUCCESS = 'app/EditionPage/GET_GROUP_PERMISSIONS_SUCCESS';
export const GET_GROUP_PERMISSIONS_FAILURE = 'app/EditionPage/GET_GROUP_PERMISSIONS_FAILURE';
export const GET_PERMISSIONS = 'app/EditionPage/GET_PERMISSIONS';
export const GET_PERMISSIONS_SUCCESS = 'app/EditionPage/GET_PERMISSIONS_SUCCESS';
export const GET_PERMISSIONS_FAILURE = 'app/EditionPage/GET_PERMISSIONS_FAILURE';
export const ADD_GROUP = 'app/EditionPage/ADD_GROUP';
export const ADD_GROUP_FAILURE = 'app/EditionPage/ADD_GROUP_FAILURE';
export const DELETE_GROUP = 'app/EditionPage/DELETE_GROUP';
export const DELETE_GROUP_FAILURE = 'app/EditionPage/DELETE_GROUP_FAILURE';
export const EDIT_GROUP = 'app/EditionPage/EDIT_GROUP';
export const EDIT_GROUP_FAILURE = 'app/EditionPage/EDIT_GROUP_FAILURE';
export const GET_HISTORY = 'app/ProfilePage/GET_HISTORY';
export const GET_HISTORY_SUCCESS = 'app/ProfilePage/GET_HISTORY_SUCCESS';
export const GET_HISTORY_FAILURE = 'app/ProfilePage/GET_HISTORY_FAILURE';
export const ALL_HISTORY_LOADED = 'app/ProfilePage/ALL_HISTORY_LOADED';

export const tabs = [
    {
        href: '/edition/users',
        label: 'Пользователи',
        permissions: 'user',
    },
    {
        href: '/edition/groups',
        label: 'Группы',
        onlyAdmin: true,
    },
    {
        href: '/edition/journal',
        label: 'Журнал',
        permissions: 'history',
    },
];

export const historyMap = [
    {
        value: 'date',
        label: 'Дата',
    },
    {
        value: 'time',
        label: 'Время',
    },
    {
        value: 'user',
        label: 'Пользователь',
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

export const usersTableHeader = [
    'Пользователь',
    'Группа',
    'Статус',
];

export const groupsTableHeader = [
    'Группа',
    'Пользователей',
    'Статус',
];

export const HISTORY_UPLOAD_LIMIT = 10;
