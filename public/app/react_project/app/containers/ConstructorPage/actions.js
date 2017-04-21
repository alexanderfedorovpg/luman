
import {
        LOAD_FEED,
        LOAD_FEED_SUCCESS,
        LOAD_FEED_FAILURE,

        HIDE_FEED_ITEM,
        HIDE_FEED_ITEM_SUCCESS,
        HIDE_FEED_ITEM_FAILURE,

        FEED_TO_WORK,
        FEED_TO_WORK_SUCCESS,
        FEED_TO_WORK_FAILURE,

        SELECT_FEED,

        SET_FILTERS,
        SET_FILTER

} from './constants';

export function setFilters(payload) {
    return {
        type: SET_FILTERS,
        payload
    };
}
export function setFilter(filter) {
    return {
        type: SET_FILTER,
        payload: filter,
    };
}

export function loadFeed(params) {
    return {
        type: LOAD_FEED,
        payload: params
    };
}

export function feedLoaded(data) {
    return {
        type: LOAD_FEED_SUCCESS,
        payload: data
    };
}

export function feedLoadingError(error) {
    return {
        type: LOAD_FEED_FAILURE,
        error
    };
}

export function hideFeedItem(id) {
    return {
        type: HIDE_FEED_ITEM,
        payload: id
    };
}

export function feedItemHidden(id) {
    return {
        type: HIDE_FEED_ITEM_SUCCESS,
        payload: id
    };
}

export function feedItemHidingError(error) {
    return {
        type: HIDE_FEED_ITEM_FAILURE,
        error
    };
}

export function feedToWork(data) {
    return {
        type: FEED_TO_WORK,
        payload: data
    };
}

export function feedInWork() {
    return {
        type: FEED_TO_WORK_SUCCESS
    };
}

export function feedToWorkError(error) {
    return {
        type: FEED_TO_WORK_FAILURE,
        error
    };
}


export function selectFeed(id) {
    return {
        type: SELECT_FEED,
        payload: id
    };
}