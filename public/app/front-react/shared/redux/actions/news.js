import { createAction } from 'redux-act'

export const fetch = createAction('FETCH_NEWS')
export const fetched = createAction('FETCH_NEWS_SUCCESS')
export const fetchError = createAction('FETCH_NEWS_FAILURE')

export const fetchVideo = createAction('FETCH_VIDEO_NEWS')
export const videoFetched = createAction('FETCH_VIDEO_NEWS_SUCCESS')
export const videoFetchError = createAction('FETCH_VIDEO_NEWS_FAILURE')

export const fetchHome = createAction('FETCH_HOME_NEWS')
export const homeFetched = createAction('FETCH_HOME_NEWS_SUCCESS')
export const homeFetchError = createAction('FETCH_HOME_NEWS_FAILURE')
