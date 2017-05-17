/*
 *
 * ProfilePage actions
 *
 */

import {
    EDIT_USER_DATA,
    EDIT_USER_DATA_SUCCESS,
    EDIT_USER_DATA_FAILURE,
    GET_LAST_ACTIONS,
    GET_LAST_ACTIONS_SUCCESS,
    GET_LAST_ACTIONS_FAILURE,
    ALL_ACTIONS_LOADED,
    ENABLE_EDIT_PASSWORD,
} from './constants';

export function getLastActions() {
    return {
        type: GET_LAST_ACTIONS,
    };
}

export function successGetLastActions(actions) {
    return {
        type: GET_LAST_ACTIONS_SUCCESS,
        payload: { actions },
    };
}
export function failureGetLastActions() {
    return {
        type: GET_LAST_ACTIONS_FAILURE,
    };
}

export function editUserData(data) {
    return {
        type: EDIT_USER_DATA,
        payload: data,
    };
}

export function successEditUserData() {
    return {
        type: EDIT_USER_DATA_SUCCESS,
    };
}
export function failureEditUserData() {
    return {
        type: EDIT_USER_DATA_FAILURE,
    };
}

export function allActionsLoaded() {
    return {
        type: ALL_ACTIONS_LOADED,
    };
}

export function enableEditPassword() {
    return {
        type: ENABLE_EDIT_PASSWORD,
    };
}
