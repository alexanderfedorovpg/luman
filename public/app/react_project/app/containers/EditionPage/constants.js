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

export const tabs = [
    {
        href: '/edition/users',
        label: 'Пользователи',
    },
    {
        href: '/edition/groups',
        label: 'Группы',
    },
    {
        href: '/edition/journal',
        label: 'Журнал',
    },
];


export const usersTableHeader = [
    'Пользователь',
    'Группа',
    'Статус',
];
