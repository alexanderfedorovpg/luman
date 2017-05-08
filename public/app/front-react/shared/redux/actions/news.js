import { createAction } from 'redux-act'

export const fetchTop = createAction('FETCH_TOP_NEWS')
export const topFetched = createAction('FETCH_TOP_NEWS_SUCCESS')
export const topFetchError = createAction('FETCH_TOP_NEWS_FAILURE')
export const fetchMoreTop = createAction('FETCH_MORE_TOP')

export const setTopRubric = createAction('SET_TOP_RUBRIC')

export const fetchNoise = createAction('FETCH_NOISE')
export const noiseFetched = createAction('FETCH_NOISE_SUCCESS')
export const noiseFetchError = createAction('FETCH_NOISE_FAILURE')
export const fetchMoreNoise = createAction('FETCH_MORE_NOISE')

export const fetchRelated = createAction('FETCH_RELATED_NEWS')
export const relatedFetched = createAction('FETCH_RELATED_NEWS_SUCCESS')
export const relatedFetchError = createAction('FETCH_RELATED_NEWS_FAILURE')

export const fetchHome = createAction('FETCH_HOME_NEWS')
export const homeFetched = createAction('FETCH_HOME_NEWS_SUCCESS')
export const homeFetchError = createAction('FETCH_HOME_NEWS_FAILURE')
