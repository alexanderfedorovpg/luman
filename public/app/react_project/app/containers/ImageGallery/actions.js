import {
    GET_IMAGES,
    GET_IMAGES_SUCCESS,
    GET_IMAGES_FAILURE,

    SAVE_IMAGE,
    SAVE_IMAGE_SUCCESS,
    SAVE_IMAGE_FAILURE,
} from './constants'

export const loadImages = payload => ({
    type: GET_IMAGES,
    payload
})

export const imagesLoaded = payload => ({
    type: GET_IMAGES_SUCCESS,
    payload
})

export const imagesLoadingError = payload => ({
    type: GET_IMAGES_FAILURE,
    payload
})

export const saveImage = payload => ({
    type: SAVE_IMAGE,
    payload
})

export const imageSaved = payload => ({
    type: SAVE_IMAGE_SUCCESS,
    payload
})

export const imageSavingError = payload => ({
    type: SAVE_IMAGE_FAILURE,
    payload
})
