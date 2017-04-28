import {
    LOAD_CATEGORIES_STATS,
    LOAD_CATEGORIES_STATS_FAILURE,
    LOAD_CATEGORIES_STATS_SUCCESS
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
