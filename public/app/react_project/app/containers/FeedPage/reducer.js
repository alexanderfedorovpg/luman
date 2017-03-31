/*
 *
 * FeedPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
} from './constants';

const initialState = fromJS({
    data: [
        {
            id: 1,
            header: 'Песков: Москва уже «серьёзно устала» от обвинений в хакерских атаках'
        },
        {
            id: 2,
            header: 'Смертник на грузовике въехал в здание полиции в Египте'
        },
        {
            id: 3,
            header: 'Кремль заявил о «серьезной усталости» от обвинений в кибератаках'
        },
        {
            id: 4,
            header: 'В Кремле прокомментировали антитабачную концепцию Минздрава'
        },
        {
            id: 5,
            header: 'Сын вице-президента "Лукойла" снова развлекается за рулем'
        },
        {
            id: 6,
            header: 'Ученые: два небесных объекта летят в сторону Земли'
        }
    ]
});

function feedPageReducer(state = initialState, action) {
  switch (action.type) {

    default:
      return state;
  }
}

export default feedPageReducer;
