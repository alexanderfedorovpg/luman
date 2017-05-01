import {
    LOAD_CATEGORIES_STATS,
    LOAD_CATEGORIES_STATS_FAILURE,
    LOAD_CATEGORIES_STATS_SUCCESS,
    LOAD_AUTHORS_STATS,
    LOAD_AUTHORS_STATS_FAILURE,
    LOAD_AUTHORS_STATS_SUCCESS
} from './constants'

export const loadCategoriesStatslist = () => ({
    type: LOAD_CATEGORIES_STATS
});

export const categoriesStatsLoaded = payload => ({
    type: LOAD_CATEGORIES_STATS_SUCCESS,
    payload
});

export const categoriesStatsLoadingError = error => ({
    type: LOAD_CATEGORIES_STATS_FAILURE,
    error
});


export const loadAuthorsList = () => ({
    type: LOAD_AUTHORS_STATS
});

export const authorsLoaded = payload => ({
    type: LOAD_AUTHORS_STATS_SUCCESS,
    payload
});

export const authorsLoadingError = error => ({
    type: LOAD_AUTHORS_STATS_FAILURE,
    error
});
