import { createSelector } from 'reselect'

import {
    selectUsersMap
} from 'containers/App/selectors'

const selectReadyPageDomain = (state) => state.get('readyPage')

const selectNewsList = createSelector(
    selectReadyPageDomain,
    selectUsersMap,
    (root, users) => {
        return root.getIn(['news', 'data'])
            .map(value => {
                let result = value

                if (value.get('editor_id')) {
                    result = result.set('editor', users[value.get('editor_id')])
                }

                return result
            }).toJS()
    }
)

const selectedLoading = createSelector(
    selectReadyPageDomain,
    root => root.getIn(['news', 'loading'])
)

const selectSearchVars = createSelector(
    selectReadyPageDomain,
    root => root.getIn(['news', 'search']).toJS()
)

const selectOldIds = createSelector(
    selectReadyPageDomain,
    root => root.getIn(['news', 'showed']).toJS()
)

export {
    selectReadyPageDomain,
    selectNewsList,
    selectLoading,
    selectSearchVars,
    selectOldIds
}
