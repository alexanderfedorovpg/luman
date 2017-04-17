export const LOAD_NEWSLIST = 'app/NewslistPage/LOAD_NEWSLIST';
export const LOAD_NEWSLIST_SUCCESS = 'app/NewslistPage/LOAD_NEWSLIST_SUCCESS';
export const LOAD_NEWSLIST_FAILURE = 'app/NewslistPage/LOAD_NEWSLIST_FAILURE';

export const REJECT_ARTICLE = 'app/NewslistPage/REJECT_ARTICLE';
export const REJECT_ARTICLE_SUCCESS = 'app/NewslistPage/REJECT_ARTICLE_SUCCESS';
export const REJECT_ARTICLE_FAILURE = 'app/NewslistPage/REJECT_ARTICLE_FAILURE';

export const ACCEPT_ARTICLE = 'app/NewslistPage/ACCEPT_ARTICLE';
export const ACCEPT_ARTICLE_SUCCESS = 'app/NewslistPage/ACCEPT_ARTICLE_SUCCESS';
export const ACCEPT_ARTICLE_FAILURE = 'app/NewslistPage/ACCEPT_ARTICLE_FAILURE';

export const SET_FILTER = 'app/NewslistPage/SET_FILTER';

export const filters = {
    editor: [
        {
            title: 'Назначенные мне',
            value: 'MY'
        },
        {
            title: 'Общие',
            value: 'FREE'
        }
    ],
    supervisor: [
        {
            title: 'В работе',
            value: 'ASSIGNED'
        },
        {
            title: 'Зависли',
            value: 'FREE'
        }
    ]
}
