import { fromJS } from 'immutable'
import {
    GET_LINKS_SUCCESS
} from './constants'

const initialState = fromJS({
    links: {
        data: []
    },
    page: {
        data: ''
    }
});

function helpReducer(state = initialState, action) {
  switch (action.type) {
    case GET_LINKS_SUCCESS:
        return state.setIn(['links', 'data'], action.payload.wikipedia)

    default:
        return state;
  }
}

export default helpReducer;
