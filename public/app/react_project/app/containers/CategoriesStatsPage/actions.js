import {
    LOAD_CATEGORIES_PAGE_STATS_SUCCESS,
    LOAD_CATEGORIES_PAGE_STATS,
    LOAD_CATEGORIES_PAGE_STATS_FAILURE,
    CHANGE_CATEGORY
} from './constants'



export const loadCategoriesPageStatslist = ()=> ({
    type: LOAD_CATEGORIES_PAGE_STATS,
});

export const categoriesPagetatsLoaded = payload => ({
    type: LOAD_CATEGORIES_PAGE_STATS_SUCCESS,
    payload
});

export const categoriesStatsPageLoadingError = error => ({
    type: LOAD_CATEGORIES_PAGE_STATS_FAILURE,
    error
});


export const changeCategoryName = (category) => ({
        type: CHANGE_CATEGORY,
        category
});
