/*
 *
 * ProgramsPage constants
 *
 */

export const OPEN_PAGE = 'app/ProgramsPage/OPEN_PAGE';
export const SET_RECORDS_TYPE = 'app/ProgramsPage/SET_RECORDS_TYPE';
export const CHANGE_RUBRIC = 'app/ProgramsPage/CHANGE_RUBRIC';
export const LOAD_PROGRAMS = 'app/ProgramsPage/LOAD_PROGRAMS';
export const LOAD_PROGRAMS_SUCCESS = 'app/ProgramsPage/LOAD_PROGRAMS_SUCCESS';
export const LOAD_PROGRAMS_FAILURE = 'app/ProgramsPage/LOAD_PROGRAMS_FAILURE';
export const DELETE_PROGRAM = 'app/ProgramsPage/DELETE_PROGRAM';
export const DELETE_PROGRAM_SUCCESS = 'app/ProgramsPage/DELETE_PROGRAM_SUCCESS';
export const DELETE_PROGRAM_FAILURE = 'app/ProgramsPage/DELETE_PROGRAM_FAILURE';
export const LOAD_RECORDS = 'app/ProgramsPage/LOAD_RECORDS';
export const LOAD_RECORDS_SUCCESS = 'app/ProgramsPage/LOAD_RECORDS_SUCCESS';
export const LOAD_RECORDS_FAILURE = 'app/ProgramsPage/LOAD_RECORDS_FAILURE';

export const recordsTypes = [
    {
        title: 'Выпуски',
        value: 'FULL',
    },
    {
        title: 'Из эфира',
        value: 'CUT',
    },
];

export const RECORDS_LIMIT = 8;
