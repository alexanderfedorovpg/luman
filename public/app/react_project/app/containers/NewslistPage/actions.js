import {
    LOAD_NEWSLIST,
    LOAD_NEWSLIST_SUCCESS,
    LOAD_NEWSLIST_FAILURE,

    REJECT_ARTICLE,
    REJECT_ARTICLE_SUCCESS,
    REJECT_ARTICLE_FAILURE,

    ACCEPT_ARTICLE,
    ACCEPT_ARTICLE_SUCCESS,
    ACCEPT_ARTICLE_FAILURE,

    DELETE_ARTICLE,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILURE,

    SET_FILTER
} from './constants'

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

export const deleteArticle = id => ({
    type: DELETE_ARTICLE,
    payload: id
})

export const articleDeleted = payload => ({
    type: DELETE_ARTICLE_SUCCESS,
    payload
})

export const articleDeletionError = error => ({
    type: DELETE_ARTICLE_FAILURE,
    error
})

export const setFilter = payload => ({
    type: SET_FILTER,
    payload
})
