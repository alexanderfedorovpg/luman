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

const selectNoise = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['news', 'data'], List()).toJS().filter(value => value.top <= 3)
)

const selectNews = createSelector(
    selectConstructorPageDomain,
    root => root.getIn(['news', 'data'], List()).toJS().filter(value => value.top > 3)
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
