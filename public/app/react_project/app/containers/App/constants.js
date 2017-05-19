/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const DEFAULT_LOCALE = 'ru';

export const groups = {
    admin: 1,
    editor: 2,
    'сommissioning-editor': 3,
};

export const groupNames = {
    [groups.admin]: 'Администратор',
    [groups.editor]: 'Редактор',
    [groups['сommissioning-editor']]: 'Выпускающий',
};

export const TOGGLE_MENU = 'app/TOGGLE_MENU';
export const CLOSE_MENU = 'app/CLOSE_MENU';

export const LOAD_PROGRAMS = 'app/ProgramsPage/LOAD_PROGRAMS';
export const LOAD_PROGRAMS_SUCCESS = 'app/ProgramsPage/LOAD_PROGRAMS_SUCCESS';
export const LOAD_PROGRAMS_FAILURE = 'app/ProgramsPage/LOAD_PROGRAMS_FAILURE';

export const LOAD_EDITORS = 'app/LOAD_EDITORS';
export const LOAD_EDITORS_SUCCESS = 'app/LOAD_EDITORS_SUCCESS';
export const LOAD_EDITORS_FAILURE = 'app/LOAD_EDITORS_FAILURE';

export const LOAD_USERS = 'app/LOAD_USERS';
export const LOAD_USERS_SUCCESS = 'app/LOAD_USERS_SUCCESS';
export const LOAD_USERS_FAILURE = 'app/LOAD_USERS_FAILURE';
export const ADD_USER = 'app/ADD_USER';
export const DELETE_USER = 'app/DELETE_USER';
export const EDIT_USER = 'app/EDIT_USER';

export const LOAD_GROUPS = 'app/LOAD_GROUPS';
export const LOAD_GROUPS_SUCCESS = 'app/LOAD_GROUPS_SUCCESS';
export const LOAD_GROUPS_FAILURE = 'app/LOAD_GROUPS_FAILURE';
export const ADD_GROUP = 'app/ADD_GROUP';
export const DELETE_GROUP = 'app/DELETE_GROUP';
export const EDIT_GROUP = 'app/EDIT_GROUP';

export const LOAD_CURRENT_USER = 'app/LOAD_CURRENT_USER';
export const LOAD_CURRENT_USER_SUCCESS = 'app/LOAD_CURRENT_USER_SUCCESS';
export const LOAD_CURRENT_USER_FAILURE = 'app/LOAD_CURRENT_USER_FAILURE';
export const EDIT_PROFILE = 'app/EDIT_PROFILE';

export const LOAD_RUBRICS = 'app/LOAD_RUBRICS';
export const LOAD_RUBRICS_SUCCESS = 'app/LOAD_RUBRICS_SUCCESS';
export const LOAD_RUBRICS_FAILURE = 'app/LOAD_RUBRICS_FAILURE';

export const POST_MESSAGE = 'app/POST_MESSAGE';
export const POST_MESSAGE_SUCCESS = 'app/POST_MESSAGE_SUCCESS';
export const POST_MESSAGE_FAILURE = 'app/POST_MESSAGE_FAILURE';

export const SHOW_PRELOADER = 'app/SHOW_PRELOADER';
export const HIDE_PRELOADER = 'app/HIDE_PRELOADER';

export const SHOW_INFO = 'app/SHOW_INFO';
export const HIDE_INFO = 'app/HIDE_INFO';
