import {
    LOAD_CHAT_MESSAGES,
    LOAD_CHAT_MESSAGES_SUCCESS,
    LOAD_CHAT_MESSAGES_FAILURE,

    CLEAR_CHAT_MESSAGES,
} from './constants'

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
