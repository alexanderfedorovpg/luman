import { createSelector } from 'reselect';

export const selectSearchDomain = state => state.search;

export const makeGetSearchResults = () => createSelector(
    selectSearchDomain,
    search => search.results.map(item => ({
        id: parseInt(item.id, 10),
        date: parseInt(item.publish_date, 10),
        title: item.title,
        categoryName: 'Новости',
        categoryLink: '/news',
    })),
);
