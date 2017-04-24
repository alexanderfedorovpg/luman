/*
 *
 * ProgramsPage actions
 *
 */

import {
    OPEN_PAGE,
    SET_RECORDS_TYPE,
    CHANGE_RUBRIC,
    LOAD_PROGRAMS,
    LOAD_PROGRAMS_SUCCESS,
    LOAD_PROGRAMS_FAILURE,
    DELETE_PROGRAM,
    DELETE_PROGRAM_SUCCESS,
    DELETE_PROGRAM_FAILURE,
    LOAD_RECORDS,
    LOAD_RECORDS_SUCCESS,
    LOAD_RECORDS_FAILURE,
} from './constants';

export function openPage() {
    return {
        type: OPEN_PAGE,
    };
}

export function setRecordsType(type) {
    return {
        type: SET_RECORDS_TYPE,
        payload: { type },
    };
}

export function changeRubric(id) {
    return {
        type: CHANGE_RUBRIC,
        payload: { id },
    };
}

export function loadPrograms() {
    return {
        type: LOAD_PROGRAMS,
    };
}

export function successLoadPrograms(programs) {
    return {
        type: LOAD_PROGRAMS_SUCCESS,
        payload: { programs },
    };
}

export function failureLoadPrograms(error) {
    return {
        type: LOAD_PROGRAMS_FAILURE,
        error,
    };
}

export function deleteProgram(id) {
    return {
        type: DELETE_PROGRAM,
        payload: { id },
    };
}

export function successDeleteProgram(id) {
    return {
        type: DELETE_PROGRAM_SUCCESS,
        payload: { id },
    };
}

export function failureDeleteProgram(error) {
    return {
        type: DELETE_PROGRAM_FAILURE,
        error,
    };
}

export function loadRecords() {
    return {
        type: LOAD_RECORDS,
    };
}

export function successLoadRecords(records) {
    return {
        type: LOAD_RECORDS_SUCCESS,
        payload: { records },
    };
}

export function failureLoadRecords(error) {
    return {
        type: LOAD_RECORDS_FAILURE,
        error,
    };
}

