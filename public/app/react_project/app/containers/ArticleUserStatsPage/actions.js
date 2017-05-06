import {
    LOAD_AUTHORS_STATS,
    LOAD_AUTHORS_STATS_SUCCESS,
    LOAD_AUTHORS_FAILURE,
    CHANGE_AUTHOR
} from './constants'



export const loadAuthorsPageStatslist = (category) => ({
    type: LOAD_AUTHORS_STATS,
    payload: { category },
});

export const authorsPagetatsLoaded = payload => ({
    type: LOAD_AUTHORS_STATS_SUCCESS,
    payload
});

export const authorsPageLoadingError = error => ({
    type: LOAD_AUTHORS_FAILURE,
    error
});


export const changeAuthorId = (author_id) => ({
    type: CHANGE_AUTHOR,
    author_id
});
