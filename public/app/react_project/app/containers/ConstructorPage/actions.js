import {
    LOAD_HOME_NEWS,
    LOAD_HOME_NEWS_FAILURE,
    LOAD_HOME_NEWS_SUCCESS,

    LOAD_NEWS,
    LOAD_NEWS_FAILURE,
    LOAD_NEWS_SUCCESS,

    LOAD_CATEGORIES,
    LOAD_CATEGORIES_FAILURE,
    LOAD_CATEGORIES_SUCCESS,

    SAVE_CHANGES,
    SAVE_CHANGES_FAILURE,
    SAVE_CHANGES_SUCCESS,

    ITEM_TO_MAIN,
    CHOOSE_CATEGORY,
    REMOVE_FROM_MAIN,
    MOVE_ITEM,
    CANCEL_CHANGES,

    SET_FILTER,

    SET_OPTION,
} from './constants';

export const moveItem = (type, source, target) => ({
    type: MOVE_ITEM,
    payload: {
        type,
        source,
        target
    }
})

export const setOption = (name, value) => ({
    type: SET_OPTION,
    payload: {
        name,
        value
    }
})

export const setFilter = filters => ({
    type: SET_FILTER,
    payload: filters
})

export const itemToMain = (item, type, category, before) => ({
    type: ITEM_TO_MAIN,
    payload: {
        item,
        type,
        category,
        before
    }
})

export const removeFromMain = (item, type) => ({
    type: REMOVE_FROM_MAIN,
    payload: {
        item,
        type
    }
})

export const chooseCategory = id => ({
    type: CHOOSE_CATEGORY,
    payload: id
})

export const cancelChanges = () => ({
    type: CANCEL_CHANGES
})

export const loadHomeNews = () => ({
    type: LOAD_HOME_NEWS
})

export const homeNewsLoaded = payload => ({
    type: LOAD_HOME_NEWS_SUCCESS,
    payload
})

export const homeNewsLoadingError = error => ({
    type: LOAD_HOME_NEWS_FAILURE,
    error
})

export const saveChanges = () => ({
    type: SAVE_CHANGES
})

export const changesSaved = payload => ({
    type: SAVE_CHANGES_SUCCESS,
    payload
})

export const changesSavingError = error => ({
    type: SAVE_CHANGES_FAILURE,
    error
})

export const loadNews = () => ({
    type: LOAD_NEWS
})

export const newsLoaded = payload => ({
    type: LOAD_NEWS_SUCCESS,
    payload
})

export const newsLoadingError = error => ({
    type: LOAD_NEWS_FAILURE,
    error
})

export const loadCategories = () => ({
    type: LOAD_CATEGORIES
})

export const categoriesLoaded = payload => ({
    type: LOAD_CATEGORIES_SUCCESS,
    payload
})

export const categoriesLoadingError = error => ({
    type: LOAD_CATEGORIES_FAILURE,
    error
})
