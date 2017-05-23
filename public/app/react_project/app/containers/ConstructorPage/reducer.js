import { fromJS, List } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';
import {
    LOAD_HOME_NEWS,
    LOAD_HOME_NEWS_FAILURE,
    LOAD_HOME_NEWS_SUCCESS,

    LOAD_CATEGORIES_SUCCESS,

    ITEM_TO_MAIN,
    MOVE_ITEM,
    CHOOSE_CATEGORY,
    REMOVE_FROM_MAIN,
    CANCEL_CHANGES,
    REMOVE_ITEM_FROM_LIST,

    LOAD_NEWS,
    LOAD_NEWS_FAILURE,
    LOAD_NEWS_SUCCESS,

    SET_FILTER,

    SET_OPTION,
} from './constants';

import {
    LOAD_PROGRAMS_SUCCESS,
} from 'containers/ProgramsPage/constants';

const initialState = fromJS({
    filters: {
        search: '',
    },
    home: {
        search: {},
        loading: false,
        data: {},
    },
    temporary: {
        home: {},
        item: null,
    },
    hidden: {
        news: [],
        records: [],
    },
    news: {
        search: {},
        loading: false,
        data: [],
    },
    categories: {
        ids: [],
        data: {},
    },
});

function constructorPageReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_HOME_NEWS:
            return state.setIn(['home', 'loading'], true);

        case LOAD_HOME_NEWS_SUCCESS:
            const newData = fromJS(action.payload);

            return state
                .setIn(['home', 'data'], newData)
                .setIn(['temporary', 'home'], newData)
                .setIn(['home', 'loading'], false);

        case LOAD_HOME_NEWS_FAILURE:
            return state
                .setIn(['home', 'loading'], false);

        case LOAD_CATEGORIES_SUCCESS:
            return state
                .setIn(['categories', 'ids'], fromJS(action.payload.map((v) => v.id)))
                .setIn(
                    ['categories', 'data'],
                    fromJS(action.payload.reduce((acc, v) => ({ ...acc, [v.id]: v }), {}))
                );

        case LOAD_NEWS:
            return state.setIn(['news', 'loading'], true);

        case LOAD_NEWS_SUCCESS:
            return state.setIn(['news', 'data'], fromJS(action.payload));

        case LOAD_NEWS_FAILURE:
            return state.setIn(['news', 'loading'], false);

        case ITEM_TO_MAIN:
            // Если выбрана категория - добавляем итем,
            // если не выбрана, то запоминаем итем для последующего выбора категории
            if (!action.payload.category) {
                return state.setIn(['temporary', 'item'], fromJS(action.payload))
            }

            return state
                ::addItemToMain(
                    action.payload.type,
                    action.payload.item,
                    action.payload.category,
                    action.payload.before
                )
                ::normalizeRating(action.payload.type)
                .updateIn(['news', 'data'], value => {
                    if (action.payload.type !== 'broadcast') {
                        return value.filter(value => value.get('id') !== action.payload.item.id);
                    } else {
                        return value
                    }
                });

        case REMOVE_ITEM_FROM_LIST:
            return state.updateIn(
                ['hidden', action.payload.type],
                (items) => items.push(action.payload.id)
            );

        case CHOOSE_CATEGORY:
            // если выбран итем, то добавляем его в категорию
            // если итема нет - ничего не делаем
            const tempItem = state.getIn(['temporary', 'item']);
            if (tempItem) {
                const { item, type } = tempItem.toJS();

                return state
                    ::addItemToMain(
                        type,
                        item,
                        action.payload
                    )
                    ::normalizeRating(type)
                    .setIn(['temporary', 'item'], null);
            }
            return state;

        case REMOVE_FROM_MAIN:
            return state.updateIn(
                ['temporary', 'home', action.payload.type],
                (arr) => (
                    arr.filterNot((value) => (
                        value.getIn(['data', 'id']) == action.payload.item.id)
                    )
                )
            );

        case CANCEL_CHANGES:
            return state.setIn(['temporary', 'home'], state.getIn(['home', 'data']));

        case LOCATION_CHANGE:
            return state.setIn(['temporary', 'item'], null);

        case SET_FILTER:
            return state.update('filters', (f) => f.merge(fromJS(action.payload)));

        case SET_OPTION:
            return state.setIn(['temporary', 'home', 'options', action.payload.name], action.payload.value);

        case MOVE_ITEM:
            return state
                .updateIn(
                    ['temporary', 'home', action.payload.type],
                    (arr) => {
                        const item = arr.find((v) => v.getIn(['data', 'id']) == action.payload.source);
                        const source = arr.indexOf(item);
                        const target = arr.findIndex((v) => v.getIn(['data', 'id']) == action.payload.target);
                        const destination = source > target
                            ? target
                            : target - 1;

                        const result = arr.delete(source);

                        return target > -1
                            ? result.insert(destination, item)
                            : result.push(item);
                    }
                )
                ::normalizeRating(action.payload.type);

        default:
            return state;
    }
}

function normalizeRating(type) {
    const state = this;

    return state
        .updateIn(
            ['temporary', 'home', type],
            (arr) => arr.map((val, index) => val.set('top', index))
        );
}

// добавляет итем во временный пулл главной
function addItemToMain(type, item, category, before) {
    const state = this;

    return state
        .updateIn(
            ['temporary', 'home', type],
            (arr) => {
                let data;
                const index = arr.findIndex((v) => v.getIn(['data', 'id']) == before);

                switch (type) {
                    case 'news':
                    case 'war':
                        data = fromJS({
                            category: state.getIn(['categories', 'data', `${category}`]).toJS(),
                            data: item,
                            top: 1,
                        });
                        break;

                    case 'noise':
                        data = fromJS({
                            data: item,
                            top: 1,
                        });
                        break;

                    case 'broadcast':
                        data = fromJS({
                            data: {
                                ...item,
                                program_id: category,
                            },
                            top: 1,
                        });
                        break;
                }

                return index > -1
                    ? arr.insert(index, data)
                    : arr.push(data);
            }
        );
}

export default constructorPageReducer;
