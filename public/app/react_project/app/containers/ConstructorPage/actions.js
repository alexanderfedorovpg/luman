import {
    GET_ONLINE,
    GET_ONLINE_FAILURE,
    GET_ONLINE_SUCCESS,

    LOAD_HOME_NEWS,
    LOAD_HOME_NEWS_FAILURE,
    LOAD_HOME_NEWS_SUCCESS,

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

    REMOVE_FROM_CONSTRUCTOR,
    REMOVE_FROM_CONSTRUCTOR_SUCCESS,
    REMOVE_FROM_CONSTRUCTOR_FAILURE,

    LOAD_ITEMS,
    LOAD_ITEMS_SUCCESS,
    LOAD_ITEMS_FAILURE,

    SET_FILTER,

    SAVE_COVER_IMG,

    LOAD_COVER_IMG,
    LOAD_COVER_IMG_SUCCESS,
    LOAD_COVER_IMG_FAILURE,

    SET_OPTION,
} from './constants';

export const setCoverImg = (data) => ({
    type:    SAVE_COVER_IMG,
    payload: {
        ...data,
    }
});

export const failureSetCoverImg = (error) => ({
    type: LOAD_COVER_IMG_FAILURE,
    error,
});

export const getCoverImg = () => ({
    type: LOAD_COVER_IMG,
});

export const loadedCoverImg = (data) => ({
    type:    LOAD_COVER_IMG_SUCCESS,
    payload: {
        ...data
    }
});

export const moveItem = (type, source, target) => ({
    type: MOVE_ITEM,
    payload: {
        type,
        source,
        target,
    },
});

export const setOption = (name, value) => ({
    type: SET_OPTION,
    payload: {
        name,
        value,
    },
});

export const setFilter = (filters) => ({
    type: SET_FILTER,
    payload: filters,
});

export const itemToMain = (item, type, category, before) => ({
    type: ITEM_TO_MAIN,
    payload: {
        item,
        type,
        category,
        before,
    },
});

export const removeFromMain = (item, type) => ({
    type: REMOVE_FROM_MAIN,
    payload: {
        item,
        type,
    },
});

export const chooseCategory = (id) => ({
    type: CHOOSE_CATEGORY,
    payload: id,
});

export const cancelChanges = () => ({
    type: CANCEL_CHANGES,
});

export const loadOnline = () => ({
    type: GET_ONLINE,
});

export const onlineLoaded = (payload) => ({
    type: GET_ONLINE_SUCCESS,
    payload,
});

export const onlineLoadingError = (error) => ({
    type: GET_ONLINE_FAILURE,
    error,
});

export const loadHomeNews = () => ({
    type: LOAD_HOME_NEWS,
});

export const homeNewsLoaded = (payload) => ({
    type: LOAD_HOME_NEWS_SUCCESS,
    payload,
});

export const homeNewsLoadingError = (error) => ({
    type: LOAD_HOME_NEWS_FAILURE,
    error,
});

export const saveChanges = () => ({
    type: SAVE_CHANGES,
});

export const changesSaved = (payload) => ({
    type: SAVE_CHANGES_SUCCESS,
    payload,
});

export const changesSavingError = (error) => ({
    type: SAVE_CHANGES_FAILURE,
    error,
});

export const loadCategories = () => ({
    type: LOAD_CATEGORIES,
});

export const categoriesLoaded = (payload) => ({
    type: LOAD_CATEGORIES_SUCCESS,
    payload,
});

export const categoriesLoadingError = (error) => ({
    type: LOAD_CATEGORIES_FAILURE,
    error,
});

export const removeFromConstructor = (id, type) => ({
    type: REMOVE_FROM_CONSTRUCTOR,
    payload: { id, type },
});

export const successRemoveFromConstructor = (id, type) => ({
    type: REMOVE_FROM_CONSTRUCTOR_SUCCESS,
    payload: { id, type },
});

export const failureRemoveFromConstructor = (error) => ({
    type: REMOVE_FROM_CONSTRUCTOR_FAILURE,
    error,
});

export const loadItems = (type) => ({
    type: LOAD_ITEMS,
    payload: { type },
});

export const successLoadItems = (items) => ({
    type: LOAD_ITEMS_SUCCESS,
    payload: items,
});

export const failureLoadItems = (error) => ({
    type: LOAD_ITEMS_FAILURE,
    error,
});
