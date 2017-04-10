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
    'admin': 1,
    'editor': 2
}

export const TOGGLE_MENU = 'app/TOGGLE_MENU'
export const CLOSE_MENU = 'app/CLOSE_MENU'

export const LOAD_EDITORS = 'app/LOAD_EDITORS'
export const LOAD_EDITORS_SUCCESS = 'app/LOAD_EDITORS_SUCCESS'
export const LOAD_EDITORS_FAILURE = 'app/LOAD_EDITORS_FAILURE'
