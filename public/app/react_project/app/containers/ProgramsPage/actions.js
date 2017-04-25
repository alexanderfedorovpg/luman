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
    DELETE_RECORD,
    DELETE_RECORD_SUCCESS,
    DELETE_RECORD_FAILURE,
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

export function deleteRecord(id) {
    return {
        type: DELETE_RECORD,
        payload: { id },
    };
}

export function successDeleteRecord(id) {
    console.log(id);
    return {
        type: DELETE_RECORD_SUCCESS,
        payload: { id },
    };
}

export function failureDeleteRecord(error) {
    return {
        type: DELETE_RECORD_FAILURE,
        error,
    };
}

export function loadRecords(replace) {
    return {
        type: LOAD_RECORDS,
        payload: { replace },
    };
}

export function successLoadRecords(payload) {
    return {
        type: LOAD_RECORDS_SUCCESS,
        payload,
    };
}

export function failureLoadRecords(error) {
    return {
        type: LOAD_RECORDS_FAILURE,
        error,
    };
}

