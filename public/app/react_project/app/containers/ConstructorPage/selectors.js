import { createSelector } from 'reselect';
import { Map, List } from 'immutable';
import {
    selectUsersMap,
    selectRubrics
} from 'containers/App/selectors'


const selectConstructorPageDomain = (state) => state.get('constructorPage');

const makeSelectConstructorPageDomain = () => createSelector(
    selectConstructorPageDomain(),
    (substate) => substate.toJS()
);

const selectedPagination = createSelector(
    selectConstructorPageDomain,
    root => ({
        current: root.getIn(['news', 'current']),
        max: root.getIn(['news', 'max'])
    })
)

const selectedLoading = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['news', 'loading'])
)

const selectSearchVars = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['news', 'search'])
)

const selectedFilter = createSelector(
    selectConstructorPageDomain,
    root => root.get('filter').toJS()
)

// const selectNewslistPageDomain = (state) => state.get('newslistPage');

const selectNewsList = createSelector(
    selectConstructorPageDomain,
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


export {
    selectConstructorPageDomain,
    selectedPagination,
    selectedLoading,
    selectSearchVars,
    selectedFilter,
    selectNewsList
};
