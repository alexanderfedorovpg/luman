/*
 *
 * ProgramsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    SET_FILTER,
    LOAD_PROGRAMS_SUCCESS,
    LOAD_PROGRAMS_FAILURE,
    filters,
} from './constants';

const initialState = fromJS({
    filter: filters[0].value,
    programs: [
        {
            id: 1,
            date: '2017-04-20 11:52:38',
            category: 'Бред',
            title: 'Триумф Дональда Трампа: голубые туфли Мелании и коробка от Тиффани',
            hashTags: ['политика', 'бред', 'бредсумасшедшнего'],
        },
        {
            id: 2,
            date: '2017-04-20 11:52:38',
            category: 'Бред',
            title: 'Чего ждут от Дональда Трампа в Израиле',
            hashTags: ['политика', 'бред', 'бредсумасшедшнего'],
        },
        {
            id: 3,
            date: '2017-04-20 11:52:38',
            category: 'Бред',
            title: 'Американская Геномания. Часть 1',
            hashTags: ['политика', 'бред', 'бредсумасшедшнего'],
        },
        {
            id: 4,
            date: '2017-04-20 11:52:38',
            category: 'Бред',
            title: 'В Израиле увеличилось количество операций по пересадке органов',
            hashTags: ['политика', 'бред', 'бредсумасшедшнего'],
        },
    ],
});

function programsPageReducer(state = initialState, action) {
    switch (action.type) {
        case SET_FILTER:
            return state.set('filter', action.payload);
        case LOAD_PROGRAMS_SUCCESS:
            console.log(action.payload);
            return state.set('programs', action.payload);
        default:
            return state;
    }
}

export default programsPageReducer;
