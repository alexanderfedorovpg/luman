/*
 *
 * LivePage actions
 *
 */

import {
    GET_NEWS,
    GET_NEWS_SUCCESS,
    GET_NEWS_FAILURE,
    NEWS_TO_LIVE,
    LIVE_ON,
    SEND_NEWS,
    SEND_NEWS_SUCCESS,
    SEND_NEWS_FAILURE,
    LIVE_OFF,
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

export function newsToLive(id) {
    return {
        type: NEWS_TO_LIVE,
        payload: { id },
    };
}

export function liveOn(newsData) {
    return {
        type: LIVE_ON,
        payload: newsData,
    };
}

export function liveOff() {
    return {
        type: LIVE_OFF,
    };
}
