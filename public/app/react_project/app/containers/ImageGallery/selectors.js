import { createSelector } from 'reselect'
import { List } from 'immutable'

import {
} from 'containers/App/selectors'

const selectImageGalleryDomain = (state) => state.get('imageGallery');

const selectImagesDomain = createSelector(
    selectImageGalleryDomain,
    root => root.get('images')
)

const selectImagesData = createSelector(
    selectImagesDomain,
    news => news.get('data').toJS()
)

const selectImages = createSelector(
    selectImagesDomain,
    news => (
        news
            .getIn(['ids'], List())
            .map(value => news.getIn(['data', `${value}`])).toJS()
    )
)


export {
    selectImageGalleryDomain,
    selectImagesData,
    selectImages,
}
