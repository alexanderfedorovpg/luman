import { createSelector } from 'reselect'
import { List } from 'immutable'

import {
    selectUsersMap
} from 'containers/App/selectors'

const selectEditorPageDomain = (state) => state.get('editorPage');

const selectChat = createSelector(
    selectEditorPageDomain,
    selectUsersMap,
    (root, users) => ({
        messages: root.getIn(['chat', 'messages', 'data'], List())
            .map(value => value.update('author', id => users[id])).toJS(),
        loading: root.getIn(['chat', 'messages', 'loading'])
    })
)

const selectArticle = createSelector(
    selectEditorPageDomain,
    root => root.getIn(['article', 'data']).toJS()
)

export {
    selectEditorPageDomain,
    selectChat,
    selectArticle
}
