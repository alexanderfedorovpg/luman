
import {

    LOAD_NEWSLIST,
    LOAD_NEWSLIST_FAILURE,
    LOAD_NEWSLIST_SUCCESS,

    REJECT_ARTICLE,
    REJECT_ARTICLE_SUCCESS,
    REJECT_ARTICLE_FAILURE,

    ACCEPT_ARTICLE,
    ACCEPT_ARTICLE_SUCCESS,
    ACCEPT_ARTICLE_FAILURE,

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

export const loadNewslist = () => ({
    type: LOAD_NEWSLIST
})

export const newslistLoaded = payload => ({
    type: LOAD_NEWSLIST_SUCCESS,
    payload
})

export const newslistLoadingError = error => ({
    type: LOAD_NEWSLIST_FAILURE,
    error
})

export const rejectArticle = id => ({
    type: REJECT_ARTICLE,
    payload: id
})

export const articleRejected = id => ({
    type: REJECT_ARTICLE_SUCCESS,
    payload: id
})

export const articleRejectionError = error => ({
    type: REJECT_ARTICLE_FAILURE,
    error
})

export const acceptArticle = id => ({
    type: ACCEPT_ARTICLE,
    payload: id
})

export const articleAccepted = id => ({
    type: ACCEPT_ARTICLE_SUCCESS,
    payload: id
})

export const articleAcceptionError = error => ({
    type: ACCEPT_ARTICLE_FAILURE,
    error
})