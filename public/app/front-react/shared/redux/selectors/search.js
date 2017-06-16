import { createSelector } from 'reselect';

const categoriesMap = {
    noise: {
        link: '/noise',
        name: 'Инфошум',
    },
    news: {
        link: '/news',
        name: 'Новости',
    },
    air: {
        link: '/broadcast',
        name: 'Из эфира',
    },
};

export const selectSearchDomain = state => state.search;

export const makeGetSearchResults = () => createSelector(
    selectSearchDomain,
    search => search.results.map((item) => {
        const category = categoriesMap[item.category] || {};

        return {
            id: parseInt(item.id, 10),
            date: item.publish_date,
            title: item.title,
            text: item.note,
            img: item.preview,
            categoryName: category.name || 'Новости',
            categoryLink: category.link || '/news',
        };
    }),
);

export const makeGetCurrentCategory = () => createSelector(
    selectSearchDomain,
    search => search.category,
);

export const makeGetQuery = () => createSelector(
    selectSearchDomain,
    search => search.query,
);

export const makeGetLoading = () => createSelector(
    selectSearchDomain,
    search => search.loading,
);
