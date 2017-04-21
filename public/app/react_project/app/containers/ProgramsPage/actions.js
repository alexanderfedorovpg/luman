/*
 *
 * ProgramsPage actions
 *
 */

import {
    SET_FILTER,
    LOAD_PROGRAMS,
    LOAD_PROGRAMS_SUCCESS,
    LOAD_PROGRAMS_FAILURE,
} from './constants';

export function setFilter(filter) {
    return {
        type: SET_FILTER,
        payload: filter,
    };
}

export function loadPrograms() {
    return {
        type: LOAD_PROGRAMS,
    };
}

export function programsLoaded(payload) {
    return {
        type: LOAD_PROGRAMS_SUCCESS,
        payload,
    };
}

export function loadingProgramsError(error) {
    return {
        type: LOAD_PROGRAMS_FAILURE,
        error,
    };
}
