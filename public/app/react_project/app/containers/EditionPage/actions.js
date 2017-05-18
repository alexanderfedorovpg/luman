/*
 *
 * EditionPage actions
 *
 */

import {
    ADD_USER,
    ADD_USER_SUCCESS,
    ADD_USER_FAILURE,
} from './constants';

export function addUser(userData) {
    return {
        type: ADD_USER,
        payload: userData,
    };
}

export function successAddUser() {
    return {
        type: ADD_USER_SUCCESS,
    };
}

export function failureAddUser(error) {
    return {
        type: ADD_USER_FAILURE,
        error,
    };
}
