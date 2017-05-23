import { fromJS } from 'immutable'
import {
    GET_IMAGES_SUCCESS
} from './constants'

const initialState = fromJS({
    images: {
        ids: [],
        data: {}
    }
});

function imageGalleryReducer(state = initialState, action) {
  switch (action.type) {
    case GET_IMAGES_SUCCESS:
        return state
            .setIn(['images', 'ids'], fromJS(action.payload.map(v=>v.id)))
            .setIn(
                ['images', 'data'],
                fromJS(action.payload.reduce((acc, v) => ({ ...acc, [v.id]: v }), {}))
            )

    default:
        return state;
  }
}

export default imageGalleryReducer;
