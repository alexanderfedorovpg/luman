import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
    LOAD_HOME_NEWS,
    LOAD_HOME_NEWS_FAILURE,
    LOAD_HOME_NEWS_SUCCESS,

    LOAD_CATEGORIES_SUCCESS,

    ITEM_TO_MAIN,
    CHOOSE_CATEGORY,
    REMOVE_FROM_MAIN,
    CANCEL_CHANGES,

    LOAD_NEWS,
    LOAD_NEWS_FAILURE,
    LOAD_NEWS_SUCCESS,

    SET_FILTER,

    SET_WAR_MODE,
} from './constants';

import {
    LOAD_PROGRAMS_SUCCESS
} from 'containers/ProgramsPage/constants';

const initialState = fromJS({
    filters: {
        search: ''
    },
    home: {
        search: {},
        loading: false,
        data: {},
    },
    temporary: {
        home: {},
        item: null
    },
    news: {
        search: {},
        loading: false,
        data: [],
    },
    categories: {
        ids: [],
        data: {}
    },
});

function constructorPageReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_HOME_NEWS:
            return state.setIn(['home', 'loading'], true)

        case LOAD_HOME_NEWS_SUCCESS:
            return state
                .setIn(['home', 'data'], fromJS(action.payload))
                .setIn(['temporary', 'home'], fromJS(action.payload))
                .setIn(['home', 'loading'], false)

        case LOAD_HOME_NEWS_FAILURE:
            return state
                .setIn(['home', 'loading'], false)

        case LOAD_CATEGORIES_SUCCESS:
            return state
                .setIn(['categories', 'ids'], fromJS(action.payload.map(v=>v.id)))
                .setIn(
                    ['categories', 'data'],
                    fromJS(action.payload.reduce((acc, v) => ({ ...acc, [v.id]: v }), {}))
                )

        case LOAD_NEWS:
            return state.setIn(['news', 'loading'], true)

        case LOAD_NEWS_SUCCESS:
            return state.setIn(['news', 'data'], fromJS(action.payload));

        case LOAD_NEWS_FAILURE:
            return state.setIn(['news', 'loading'], false)

        case ITEM_TO_MAIN:
            if (!action.payload.category) {
                return state.setIn(['temporary', 'item'], fromJS(action.payload))
            }
            else {
                return state
                    ::addItemToMain({
                        type: action.payload.type,
                        item: action.payload.item,
                        category: action.payload.category
                    })
            }

            return state

        case CHOOSE_CATEGORY:
            const tempItem = state.getIn(['temporary', 'item'])
            if (tempItem) {
                const { item, type } = tempItem.toJS()

                return state
                    ::addItemToMain({
                        type,
                        item,
                        category: action.payload
                    })
                    .setIn(['temporary', 'item'], null)
            }
            return state

        case REMOVE_FROM_MAIN:
            return state.updateIn(
                ['temporary', 'home', action.payload.type],
                arr => (
                    arr.filterNot(value => (
                        value.getIn(['data', 'id']) == action.payload.item.id)
                    )
                )
            )

        case CANCEL_CHANGES:
            return state.setIn(['temporary', 'home'], state.getIn(['home', 'data']))

        case LOCATION_CHANGE:
            return state.setIn(['temporary', 'item'], null)

        case SET_FILTER:
            return state.update('filters', f => f.merge(fromJS(action.payload)))

        case SET_WAR_MODE:
            return state.setIn(['temporary', 'home', 'war'], action.payload)

        default:
            return state;
    }
}

function addItemToMain({ type, category, item }) {
    const state = this

    return state
        .updateIn(
            ['temporary', 'home', type],
            arr => {
                switch (type) {
                    case 'news':
                        return arr.push(fromJS({
                            category: state.getIn(['categories', 'data', `${category}`]).toJS(),
                            data: item,
                            top: 1
                        }))
                    case 'noise':
                        return arr.push(fromJS({
                            data: item,
                            top: 1
                        }))
                    case 'broadcast':
                        return arr.push(fromJS({
                            data: {
                                ...item,
                                program_id: category
                            },
                            top: 1
                        }))
                }
            }
        )
}

export default constructorPageReducer;
