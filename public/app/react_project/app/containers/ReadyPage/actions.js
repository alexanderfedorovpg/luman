import {
        LOAD_READY_NEWS,
        LOAD_READY_NEWS_SUCCESS,
        LOAD_READY_NEWS_FAILURE,

        PUBLISH_ARTICLE,
        PUBLISH_ARTICLE_SUCCESS,
        PUBLISH_ARTICLE_FAILURE,

        DELEGATE_ARTICLE,
        DELEGATE_ARTICLE_SUCCESS,
        DELEGATE_ARTICLE_FAILURE,

        SET_FILTERS
} from './constants';

export function setFilters(payload) {
    return {
        type: SET_FILTERS,
        payload
    };
}

export function loadReadyNews(params) {
    return {
        type: LOAD_READY_NEWS,
        payload: params
    };
}

export function readyNewsLoaded(data) {
    return {
        type: LOAD_READY_NEWS_SUCCESS,
        payload: data
    };
}

export function readyNewsLoadingError(error) {
    return {
        type: LOAD_READY_NEWS_FAILURE,
        error
    };
}

export function publishArticle(params) {
    return {
        type: PUBLISH_ARTICLE,
        payload: params
    };
}

export function articlePublished(data) {
    return {
        type: PUBLISH_ARTICLE_SUCCESS,
        payload: data
    };
}

export function articlePublishingError(error) {
    return {
        type: PUBLISH_ARTICLE_FAILURE,
        error
    };
}

export const delegateArticle = payload => ({
    type: DELEGATE_ARTICLE,
    payload
})

export const articleDelegated = payload => ({
    type: DELEGATE_ARTICLE_SUCCESS,
    payload
})

export const articleDelegationError = error => ({
    type: DELEGATE_ARTICLE_FAILURE,
    error
})

