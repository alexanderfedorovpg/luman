/*
 *
 * ProgramsPage actions
 *
 */

import {
    SET_FILTER,
} from './constants';

export function setFilter(filter) {
    return {
        type: SET_FILTER,
        payload: filter,
    };
}
