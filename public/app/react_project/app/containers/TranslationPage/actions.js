import {
    LOAD_ONLINE,
    LOAD_ONLINE_SUCCESS,
    LOAD_ONLINE_FAILURE,

    LOAD_COMMENTS,
    LOAD_COMMENTS_SUCCESS,
    LOAD_COMMENTS_FAILURE,

    ADD_COMMENT,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,

    EDIT_COMMENT,
    EDIT_COMMENT_SUCCESS,
    EDIT_COMMENT_FAILURE,

    DELETE_COMMENT,
    DELETE_COMMENT_SUCCESS,
    DELETE_COMMENT_FAILURE,

    SET_COMMENTS_ACTION,
    SET_COMMENT_EDIT,

    SAVE_TITLE,
    SAVE_TITLE_SUCCESS,
    SAVE_TITLE_FAILURE,

    SAVE_COVER,
    SAVE_COVER_SUCCESS,
    SAVE_COVER_FAILURE,
} from './constants'

export const setCommentsAction = payload => ({
    type: SET_COMMENTS_ACTION,
    payload
})

export const setCommentEdit = payload => ({
    type: SET_COMMENT_EDIT,
    payload
})

export const loadOnline = payload => ({
    type: LOAD_ONLINE,
    payload
})

export const onlineLoaded = payload => ({
    type: LOAD_ONLINE_SUCCESS,
    payload
})

export const onlineLoadingError = error => ({
    type: LOAD_ONLINE_FAILURE,
    error
})

export const loadComments = payload => ({
    type: LOAD_COMMENTS,
    payload
})

export const commentsLoaded = payload => ({
    type: LOAD_COMMENTS_SUCCESS,
    payload
})

export const commentsLoadingError = error => ({
    type: LOAD_COMMENTS_FAILURE,
    error
})

export const addComment = payload => ({
    type: ADD_COMMENT,
    payload
})

export const commentAdded = payload => ({
    type: ADD_COMMENT_SUCCESS,
    payload
})

export const commentAddingError = error => ({
    type: ADD_COMMENT_FAILURE,
    error
})

export const editComment = payload => ({
    type: EDIT_COMMENT,
    payload
})

export const commentEdited = payload => ({
    type: EDIT_COMMENT_SUCCESS,
    payload
})

export const commentEditingError = error => ({
    type: EDIT_COMMENT_FAILURE,
    error
})

export const deleteComment = payload => ({
    type: DELETE_COMMENT,
    payload
})

export const commentDeleted = payload => ({
    type: DELETE_COMMENT_SUCCESS,
    payload
})

export const commentDeletingError = error => ({
    type: DELETE_COMMENT_FAILURE,
    error
})

export const saveTitle = payload => ({
    type: SAVE_TITLE,
    payload
})

export const titleSaved = payload => ({
    type: SAVE_TITLE_SUCCESS,
    payload
})

export const titleSavingError = error => ({
    type: SAVE_TITLE_FAILURE,
    error
})

export const saveCover = payload => ({
    type: SAVE_COVER,
    payload
})

export const coverSaved = payload => ({
    type: SAVE_COVER_SUCCESS,
    payload
})

export const coverSavingError = error => ({
    type: SAVE_COVER_FAILURE,
    error
})
