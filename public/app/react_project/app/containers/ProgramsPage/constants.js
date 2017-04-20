/*
 *
 * ProgramsPage constants
 *
 */

export const SET_FILTER = 'app/ProgramsPage/SET_FILTER';
export const LOAD_PROGRAMS = 'app/ProgramsPage/LOAD_PROGRAMS';
export const LOAD_PROGRAMS_SUCCESS = 'app/ProgramsPage/LOAD_PROGRAMS_SUCCESS';
export const LOAD_PROGRAMS_FAILURE = 'app/ProgramsPage/LOAD_PROGRAMS_FAILURE';

export const filters = [
    {
        title: 'Выпуски',
        value: 'EDITIONS',
    },
    {
        title: 'Из эфира',
        value: 'BROADCAST',
    },
    {
        title: 'Архив',
        value: 'ARCHIVE',
    },
];

export const tags = [
    'Все', 'Новости', 'Аналитика', 'Ток-шоу',
    'Информационная программа', 'Документалистика',
    'Музыка', 'Кино', 'Детям',
];
