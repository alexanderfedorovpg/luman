import {
    GET_LINKS,
    GET_LINKS_SUCCESS,
    GET_LINKS_FAILURE
} from './constants';

export function getLinks(payload) {
    return {
        type: GET_LINKS,
        payload
    }
}

export function linksLoaded(payload) {
    return {
        type: GET_LINKS_SUCCESS,
        payload
    }
}

export function linksLoadingError(error) {
    return {
        type: GET_LINKS_FAILURE,
        error
    }
}
