import {
    CLEAR_ARTICLE,

    TO_FIX_ARTICLE,
    TO_FIX_ARTICLE_SUCCESS,
    TO_FIX_ARTICLE_FAILURE,

    LOAD_ARTICLE,
    LOAD_ARTICLE_SUCCESS,
    LOAD_ARTICLE_FAILURE,

    DELETE_ARTICLE,
    DELETE_ARTICLE_SUCCESS,
    DELETE_ARTICLE_FAILURE,

    FINISH_ARTICLE,
    FINISH_ARTICLE_SUCCESS,
    FINISH_ARTICLE_FAILURE,

    PUBLISH_ARTICLE,
    PUBLISH_ARTICLE_SUCCESS,
    PUBLISH_ARTICLE_FAILURE,

    DELEGATE_ARTICLE,
    DELEGATE_ARTICLE_SUCCESS,
    DELEGATE_ARTICLE_FAILURE,

    REJECT_ARTICLE,
    REJECT_ARTICLE_SUCCESS,
    REJECT_ARTICLE_FAILURE,
} from './constants'

export const clearArticle = () => ({
    type: CLEAR_ARTICLE
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

export const toFixArticle = payload => ({
    type: TO_FIX_ARTICLE,
    payload
})

export const articleSendedToFix = payload => ({
    type: TO_FIX_ARTICLE_SUCCESS,
    payload
})

export const articleToFixError = error => ({
    type: TO_FIX_ARTICLE_FAILURE,
    error
})
export const loadArticle = payload => ({
    type: LOAD_ARTICLE,
    payload
})

export const articleLoaded = payload => ({
    type: LOAD_ARTICLE_SUCCESS,
    payload
})

export const articleLoadingError = error => ({
    type: LOAD_ARTICLE_FAILURE,
    error
})

export const deleteArticle = payload => ({
    type: DELETE_ARTICLE,
    payload
})

export const articleDeleted = payload => ({
    type: DELETE_ARTICLE_SUCCESS,
    payload
})

export const articleDeletionError = error => ({
    type: DELETE_ARTICLE_FAILURE,
    error
})

export const finishArticle = payload => ({
    type: FINISH_ARTICLE,
    payload
})

export const articleFinished = payload => ({
    type: FINISH_ARTICLE_SUCCESS,
    payload
})

export const articleFinishError = error => ({
    type: FINISH_ARTICLE_FAILURE,
    error
})

export const publishArticle = payload => ({
    type: PUBLISH_ARTICLE,
    payload
})

export const articlePublished = payload => ({
    type: PUBLISH_ARTICLE_SUCCESS,
    payload
})

export const articlePublishError = error => ({
    type: PUBLISH_ARTICLE_FAILURE,
    error
})

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
