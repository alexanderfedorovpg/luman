import { createSelector } from 'reselect';

export const selectAsideDomain = state => state.aside;

export const selectCoverImg = createSelector(
    selectAsideDomain,
    root => root.coverImg.url,
);

