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
    SELECT_GROUP,
    DESELECT_GROUP,
    GET_PERMISSIONS,
    GET_PERMISSIONS_SUCCESS,
    GET_PERMISSIONS_FAILURE,
    ADD_GROUP,
    ADD_GROUP_FAILURE,
    DELETE_GROUP,
    DELETE_GROUP_FAILURE,
    EDIT_GROUP,
    EDIT_GROUP_FAILURE,
    GET_HISTORY,
    GET_HISTORY_SUCCESS,
    GET_HISTORY_FAILURE,
    ALL_HISTORY_LOADED,
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

export function selectGroup(id) {
    return {
        type: SELECT_GROUP,
        payload: { id },
    };
}

export function deselectGroup() {
    return {
        type: DESELECT_GROUP,
    };
}

export function getPermissions() {
    return {
        type: GET_PERMISSIONS,
    };
}

export function successGetPermissions(permissions) {
    return {
        type: GET_PERMISSIONS_SUCCESS,
        payload: { permissions },
    };
}

export function failureGetPermissions(error) {
    return {
        type: GET_PERMISSIONS_FAILURE,
        error,
    };
}

export function addGroup(groupData) {
    return {
        type: ADD_GROUP,
        payload: groupData,
    };
}

export function failureAddGroup(error) {
    return {
        type: ADD_GROUP_FAILURE,
        error,
    };
}

export function deleteGroup(id) {
    return {
        type: DELETE_GROUP,
        payload: { id },
    };
}

export function failureDeleteGroup(error) {
    return {
        type: DELETE_GROUP_FAILURE,
        error,
    };
}

export function editGroup(id, data) {
    return {
        type: EDIT_GROUP,
        payload: { id, data },
    };
}

export function failureEditGroup(error) {
    return {
        type: EDIT_GROUP_FAILURE,
        error,
    };
}

export function getHistory() {
    return {
        type: GET_HISTORY,
    };
}

export function successGetHistory(history) {
    return {
        type: GET_HISTORY_SUCCESS,
        payload: { history },
    };
}

export function failureGetHistory(error) {
    return {
        type: GET_HISTORY_FAILURE,
        error,
    };
}

export function allHistoryLoaded() {
    return {
        type: ALL_HISTORY_LOADED,
    };
}
