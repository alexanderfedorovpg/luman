import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

const selectConstructorPageDomain = (state) => state.get('constructorPage');

const selectedLoading = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['news', 'loading'])
)

const selectSearchVars = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['news', 'search'])
)

const selectHomeNews = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['temporary', 'home'], Map()).toJS()
)

const selectCategories = createSelector(
    selectConstructorPageDomain,
    root => root
        .getIn(['categories', 'ids'], List())
        .map(value => root.getIn(['categories', 'data', `${value}`])).toJS()
)

const selectHidden = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['hidden'], Map())
)

const selectHiddenNews = createSelector(
    selectHidden,
    (hidden) => hidden.get('news', List()).toJS()
)

const selectNoise = createSelector(
    [selectConstructorPageDomain, selectHiddenNews],
    (root, hidden) => root.getIn(['news', 'data'], List()).toJS().filter(
        (value) => value.top <= 3 && hidden.indexOf(value.id) === -1
    )
)

const selectNews = createSelector(
    [selectConstructorPageDomain, selectHiddenNews],
    (root, hidden) => root.getIn(['news', 'data'], List()).toJS().filter(
        (value) => value.top > 3 && hidden.indexOf(value.id) === -1
    )
)

const selectFilters = createSelector(
    selectConstructorPageDomain,
    root => root.get('filters').toJS()
)

const selectWarMode = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['temporary', 'home', 'options', 'war'])
)

const selectWarTitle = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['temporary', 'home', 'options', 'title'])
)

const selectPristine = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['temporary', 'home']) == root.getIn(['home', 'data'])
)

export {
    selectConstructorPageDomain,
    selectCategories,
    selectNoise,
    selectNews,
    selectHomeNews,
    selectFilters,
    selectWarMode,
    selectWarTitle,
    selectPristine
}
