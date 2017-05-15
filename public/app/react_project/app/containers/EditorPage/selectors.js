import { createSelector } from 'reselect'
import { List } from 'immutable'

import {
    selectUsersMap
} from 'containers/App/selectors'

const selectEditorPageDomain = (state) => state.get('editorPage');

const selectArticle = createSelector(
    selectEditorPageDomain,
    root => root.getIn(['article', 'data']).toJS()
)

export {
    selectEditorPageDomain,
    selectArticle
}
