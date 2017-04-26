
import {

    LOAD_NEWSLIST,
    LOAD_NEWSLIST_FAILURE,
    LOAD_NEWSLIST_SUCCESS,
} from './constants';

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
