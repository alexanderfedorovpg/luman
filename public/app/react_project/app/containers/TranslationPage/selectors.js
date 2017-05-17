import { createSelector } from 'reselect'
import { List } from 'immutable'

import {
} from 'containers/App/selectors'

const selectTranslationPageDomain = (state) => state.get('translationPage');

const selectNewsDomain = createSelector(
    selectTranslationPageDomain,
    root => root.get('news')
)

const selectNewsData = createSelector(
    selectNewsDomain,
    news => news.get('data').toJS()
)

const selectNews = createSelector(
    selectNewsDomain,
    news => (
        news
            .getIn(['ids'], List())
            .map(value => news.getIn(['data', `${value}`])).toJS()
    )
)

const selectCommentsDomain = createSelector(
    selectTranslationPageDomain,
    root => root.get('comments')
)

const selectCommentsData = createSelector(
    selectCommentsDomain,
    root => root.get('data')
)

const selectComments = createSelector(
    selectCommentsDomain,
    comments => (
        comments
            .getIn(['ids'], List())
            .map(value => comments.getIn(['data', `${value}`])).toJS()
    )
)

const selectCommentsAction = createSelector(
    selectCommentsDomain,
    comments => comments.get('action')
)

const selectCommentEdited = createSelector(
    selectCommentsDomain,
    selectCommentsData,
    (comments, data) => {
        const result = data.get(`${comments.get('edit')}`)

        return result
            ? result.toJS()
            : result
    }
)

export {
    selectTranslationPageDomain,
    selectNewsData,
    selectNews,
    selectComments,
    selectCommentsAction,
    selectCommentEdited
}
