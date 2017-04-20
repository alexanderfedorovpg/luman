import {
    LOAD_CHAT_MESSAGES,
    LOAD_CHAT_MESSAGES_SUCCESS,
    LOAD_CHAT_MESSAGES_FAILURE,

    CLEAR_CHAT_MESSAGES,

    POST_MESSAGE,
    POST_MESSAGE_SUCCESS,
    POST_MESSAGE_FAILURE,

    LOAD_ARTICLE,
    LOAD_ARTICLE_SUCCESS,
    LOAD_ARTICLE_FAILURE
} from './constants'

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

export const loadChatMessages = room => ({
    type: LOAD_CHAT_MESSAGES,
    payload: room
})

export const chatMessagesLoaded = payload => ({
    type: LOAD_CHAT_MESSAGES_SUCCESS,
    payload
})

export const chatMessagesLoadingError = error => ({
    type: LOAD_CHAT_MESSAGES_FAILURE,
    error
})

export const clearChatMessages = () => ({
    type: CLEAR_CHAT_MESSAGES
})

export const postMessage = (room, message) => ({
    type: POST_MESSAGE,
    payload: {
        room,
        message
    }
})

export const messagePosted = () => ({
    type: POST_MESSAGE_SUCCESS
})

export const messagePostingError = error => ({
    type: POST_MESSAGE_FAILURE,
    error
})