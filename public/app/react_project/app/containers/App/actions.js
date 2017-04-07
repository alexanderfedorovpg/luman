import {
    TOGGLE_MENU,
    CLOSE_MENU,

    LOAD_EDITORS,
    LOAD_EDITORS_SUCCESS,
    LOAD_EDITORS_FAILURE
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
