/*
 *
 * LivePage actions
 *
 */

import {
    GET_NEWS,
    GET_NEWS_SUCCESS,
    GET_NEWS_FAILURE,
    SELECT_NEWS,
    LIVE_ON,
    LIVE_ON_SUCCESS,
    LIVE_ON_FAILURE,
    NEWS_TO_LIVE,
    NEWS_TO_LIVE_SUCCESS,
    NEWS_TO_LIVE_FAILURE,
    LIVE_OFF,
    LIVE_OFF_SUCCESS,
    LIVE_OFF_FAILURE,
    GET_LIVE,
    GET_LIVE_SUCCESS,
    GET_LIVE_FAILURE,
} from './constants';

export function getNews() {
    return {
        type: GET_NEWS,
    };
}

export function successGetNews(news) {
    return {
        type: GET_NEWS_SUCCESS,
        payload: { news },
    };
}

export function failureGetNews() {
    return {
        type: GET_NEWS_FAILURE,
    };
}

export function selectNews(id) {
    return {
        type: SELECT_NEWS,
        payload: { id },
    };
}

export function liveOn(newsData) {
    return {
        type: LIVE_ON,
        payload: newsData,
    };
}

export function successLiveOn() {
    return {
        type: LIVE_ON_SUCCESS,
    };
}

export function failureLiveOn() {
    return {
        type: LIVE_ON_FAILURE,
    };
}

export function liveOff() {
    return {
        type: LIVE_OFF,
    };
}

export function successLiveOff() {
    return {
        type: LIVE_OFF_SUCCESS,
    };
}

export function failureLiveOff() {
    return {
        type: LIVE_OFF_FAILURE,
    };
}

export function newsToLive(newsData) {
    return {
        type: NEWS_TO_LIVE,
        payload: newsData,
    };
}

export function successNewsToLive() {
    return {
        type: NEWS_TO_LIVE_SUCCESS,
    };
}

export function failureNewsToLive() {
    return {
        type: NEWS_TO_LIVE_FAILURE,
    };
}

export function getLive() {
    return {
        type: GET_LIVE,
    };
}

export function successGetLive(url) {
    return {
        type: GET_LIVE_SUCCESS,
        payload: { url },
    };
}

export function failureGetLive() {
    return {
        type: GET_LIVE_FAILURE,
    };
}
