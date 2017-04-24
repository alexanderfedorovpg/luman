import {
    TOGGLE_MENU,
    CLOSE_MENU,

    LOAD_EDITORS,
    LOAD_EDITORS_SUCCESS,
    LOAD_EDITORS_FAILURE,

    LOAD_USERS,
    LOAD_USERS_SUCCESS,
    LOAD_USERS_FAILURE,

    LOAD_CURRENT_USER,
    LOAD_CURRENT_USER_SUCCESS,
    LOAD_CURRENT_USER_FAILURE,

    LOAD_RUBRICS,
    LOAD_RUBRICS_SUCCESS,
    LOAD_RUBRICS_FAILURE,

    POST_MESSAGE,
    POST_MESSAGE_SUCCESS,
    POST_MESSAGE_FAILURE,
} from './constants';

export const toggleMenu = () => ({
    type: TOGGLE_MENU
})

export const closeMenu = () => ({
    type: CLOSE_MENU
})

export const loadEditors = () => ({
    type: LOAD_EDITORS
})

export const editorsLoaded = data => ({
    type: LOAD_EDITORS_SUCCESS,
    payload: data
})

export const editorsLoadingError = error => ({
    type: LOAD_EDITORS_FAILURE,
    error
})

export const loadUsers = () => ({
    type: LOAD_USERS
})

export const usersLoaded = data => ({
    type: LOAD_USERS_SUCCESS,
    payload: data
})

export const usersLoadingError = error => ({
    type: LOAD_USERS_FAILURE,
    error
})

export const loadCurrentUser = () => ({
    type: LOAD_CURRENT_USER
})

export const currentUserLoaded = data => ({
    type: LOAD_CURRENT_USER_SUCCESS,
    payload: data
})

export const currentUserLoadingError = error => ({
    type: LOAD_CURRENT_USER_FAILURE,
    error
})

export const loadRubrics = () => ({
    type: LOAD_RUBRICS
})

export const rubricsLoaded = data => ({
    type: LOAD_RUBRICS_SUCCESS,
    payload: data
})

export const rubricsLoadingError = error => ({
    type: LOAD_RUBRICS_FAILURE,
    error
})

export const postMessage = (room, message) => ({
    type: POST_MESSAGE,
    payload: {
        room,
        message
    }
})

export const messagePosted = () => ({
    type: POST_MESSAGE_SUCCESS
})

export const messagePostingError = error => ({
    type: POST_MESSAGE_FAILURE,
    error
})
