import { createSelector } from 'reselect'
import { List } from 'immutable'

import {
    selectUsersMap,
    selectRubrics
} from 'containers/App/selectors'

const selectNewslistPageDomain = (state) => state.get('newslistPage');

const selectNewsList = createSelector(
    selectNewslistPageDomain,
    selectUsersMap,
    selectRubrics,
    (root, users, rubrics) => {
        return root.getIn(['news', 'data'], List())
            .map(value => {
                let result = value

                if (value.get('editor_id')) {
                    result = result.set('editor', users[value.get('editor_id')])
                }

                return result
                    .set('rubrics', rubrics.find(rub => rub.id === value.get('rubrics_id')))
            }).toJS()
    }
)

const selectOldIds = createSelector(
    selectNewslistPageDomain,
    root => root.getIn(['news', 'showed']).toJS()
)

const selectFilter = createSelector(
    selectNewslistPageDomain,
    root => root.get('filter')
)

export {
    selectNewslistPageDomain,
    selectNewsList,
    selectOldIds,
    selectFilter
}
