/*
 *
 * EditionPage actions
 *
 */

import {
    ADD_USER,
    ADD_USER_FAILURE,
    DELETE_USER,
    DELETE_USER_FAILURE,
    EDIT_USER,
    EDIT_USER_FAILURE,
    SELECT_USER,
    DESELECT_USER,
} from './constants';

export function addUser(userData) {
    return {
        type: ADD_USER,
        payload: userData,
    };
}

export function failureAddUser(error) {
    return {
        type: ADD_USER_FAILURE,
        error,
    };
}

export function deleteUser(id) {
    return {
        type: DELETE_USER,
        payload: { id },
    };
}

export function failureDeleteUser(error) {
    return {
        type: DELETE_USER_FAILURE,
        error,
    };
}

export function editUser(id, data) {
    return {
        type: EDIT_USER,
        payload: { id, data },
    };
}

export function failureEditUser(error) {
    return {
        type: EDIT_USER_FAILURE,
        error,
    };
}

export function selectUser(id) {
    return {
        type: SELECT_USER,
        payload: { id },
    };
}

export function deselectUser() {
    return {
        type: DESELECT_USER,
    };
}
