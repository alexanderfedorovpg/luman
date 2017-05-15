import { createSelector } from 'reselect';

/**
 * Direct selector to the livePage state domain
 */
const selectLivePageDomain = () => (state) => state.get('livePage');

/**
 * Other specific selectors
 */

const selectNews = createSelector(
    selectLivePageDomain(),
    (state) => state.get('news')
);

const selectSelected = createSelector(
    selectLivePageDomain(),
    (state) => state.get('selected')
);

const makeGetNews = () => createSelector(
    selectNews,
    (newsMap) => {
        const news = newsMap.toJS();

        return news.ids.map((id) => news.byId[id]);
    }
);

const makeGetSelected = () => createSelector(
    [selectSelected, selectNews],
    (selected, news) => {
        const target = news.toJS().byId[selected];

        if (!target) {
            return {
                news_id: null,
                title: null,
                image_preview: null,
            };
        }

        return {
            news_id: selected,
            title: target.title,
            image_preview: target.image,
        };
    }
);

const makeGetLiveState = () => createSelector(
    selectLivePageDomain(),
    (page) => page.get('live')
);

/**
 * Default selector used by LivePage
 */

const makeSelectLivePage = () => createSelector(
    selectLivePageDomain(),
    (substate) => substate.toJS()
);

export default makeSelectLivePage;
export {
    selectLivePageDomain,
    makeGetNews,
    makeGetSelected,
    makeGetLiveState,
};
