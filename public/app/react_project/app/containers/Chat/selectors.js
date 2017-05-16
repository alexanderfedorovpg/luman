import { createSelector } from 'reselect'
import { List } from 'immutable'

import {
    selectUsersMap
} from 'containers/App/selectors'

const selectChatDomain = (state) => state.get('chat');

const selectChat = createSelector(
    selectChatDomain,
    selectUsersMap,
    (root, users) => ({
        messages: root.getIn(['messages', 'data'], List())
            .map(value => value.update('author', id => users[id])).toJS(),
        loading: root.getIn(['messages', 'loading'])
    })
)

export {
    selectChatDomain,
    selectChat
}
