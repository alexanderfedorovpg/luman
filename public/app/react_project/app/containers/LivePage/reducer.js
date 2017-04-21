/*
 *
 * LivePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
    items: [
        {
            id: 1,
            date: '2016-04-14 12:28:04',
            rating: 8,
            category: 'Политика',
            title: 'Северокорейский лидер Ким Чен Ын был сегодня убит во время спецоперации',
            hashTags: ['бред'],
        },
        {
            id: 2,
            date: '2016-04-14 12:28:04',
            rating: 7,
            category: 'Наука',
            title: 'Российские ученые нашли противоречия в самом популярном методе теоретической химии',
        },
        {
            id: 3,
            date: '2016-04-14 12:28:04',
            rating: 6,
            category: 'Политика',
            title: 'Петагон: США готовы сбить ракеты КНДР при наличии угрозы',
            hashTags: [],
        },
    ],
});

function livePageReducer(state = initialState, action) {
    switch (action.type) {
        case DEFAULT_ACTION:
            return state;
        default:
            return state;
    }
}

export default livePageReducer;
