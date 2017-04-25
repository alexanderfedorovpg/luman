export const LOAD_READY_NEWS = 'app/ReadyPage/LOAD_READY_NEWS';
export const LOAD_READY_NEWS_SUCCESS = 'app/ReadyPage/LOAD_READY_NEWS_SUCCESS';
export const LOAD_READY_NEWS_FAILURE = 'app/ReadyPage/LOAD_READY_NEWS_FAILURE';

export const PUBLISH_ARTICLE = 'app/ReadyPage/PUBLISH_ARTICLE';
export const PUBLISH_ARTICLE_SUCCESS = 'app/ReadyPage/PUBLISH_ARTICLE_SUCCESS';
export const PUBLISH_ARTICLE_FAILURE = 'app/ReadyPage/PUBLISH_ARTICLE_FAILURE';

export const SET_FILTERS = 'app/ReadyPage/SET_FILTERS';

export const filters = [
    {
        id: 1,
        title: 'По времени',
        value: 'datetime'
    },
    {
        id: 2,
        title: 'По важности',
        value: 'top'
    },
]
