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
    POST_RECORD,
    POST_RECORD_SUCCESS,
    POST_RECORD_FAILURE,
    EDIT_RECORD,
    EDIT_RECORD_SUCCESS,
    EDIT_RECORD_FAILURE,
    OPEN_MODAL,
    CLOSE_MODAL,
    START_EDIT_RECORD,
    SEARCH_RECORD,
    SELECT_RECORD,
    PLAY_VIDEO,
} from './constants';

export function openPage() {
    return {
        type: OPEN_PAGE,
    };
}

export function selectRecord(id) {
    return {
        type: SELECT_RECORD,
        payload: { id },
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

export function postRecord(payload) {
    return {
        type: POST_RECORD,
        payload,
    };
}

export function successPostRecord(payload) {
    return {
        type: POST_RECORD_SUCCESS,
        payload,
    };
}

export function failurePostRecord(error) {
    return {
        type: POST_RECORD_FAILURE,
        error,
    };
}

export function editRecord(payload) {
    return {
        type: EDIT_RECORD,
        payload,
    };
}

export function successEditRecord(payload) {
    return {
        type: EDIT_RECORD_SUCCESS,
        payload,
    };
}

export function failureEditRecord(error) {
    return {
        type: EDIT_RECORD_FAILURE,
        error,
    };
}

export function openModal(modal) {
    return {
        type: OPEN_MODAL,
        payload: { modal },
    };
}

export function closeModal() {
    return {
        type: CLOSE_MODAL,
    };
}

export function startEditRecord(id) {
    return {
        type: START_EDIT_RECORD,
        payload: { id },
    };
}

export function searchRecord(query) {
    return {
        type: SEARCH_RECORD,
        payload: { query },
    };
}

export function playVideo(id) {
    return {
        type: PLAY_VIDEO,
        payload: { id },
    };
}
