import { fork } from 'redux-saga/effects';

import news from './news';
import rubrics from './rubrics';
import broadcast from './broadcast';
import search from './search';
import programs from './programs';
import aside from './aside';

export default function* rootSaga() {
    yield [
        fork(news),
        fork(aside),
        fork(rubrics),
        fork(programs),
        fork(broadcast),
        fork(search),
    ];
}
