/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
    CHANGE_TAB,
    tabs,
} from './constants';

const initialState = fromJS({
    activeTab: tabs[0].value,
    lastActions: {
        header: [
            'Дата',
            'Время',
            'Событие',
            'Сессия',
            'Хост',
            'IP',
            'Просмотр',
        ],
        body: [
            [
                '14.01.17',
                '09:12:10',
                'login',
                '',
                '94.230.115.33',
                '94.230.115.33',
            ],
            [
                '14.01.17',
                '09:09:10',
                'Создание страницы',
                '',
                '94.230.115.33',
                '94.230.115.33',
            ],
        ],
    },
});

function profilePageReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TAB:
            return state.set('activeTab', action.payload.tab.value);
        default:
            return state;
    }
}

export default profilePageReducer;
