import { take, select, call, put, cancel, takeLatest, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { toastrEmitter as toastr } from 'react-redux-toastr/lib/toastrEmitter';
import { showPreloader, hidePreloader } from 'containers/App/actions';
import { selectCurrentUser } from 'containers/App/selectors';
import {
    REJECT_ARTICLE,
    TO_FIX_ARTICLE,
    LOAD_ARTICLE,
    FINISH_ARTICLE,
    PUBLISH_ARTICLE,
    DELETE_ARTICLE,
    DELEGATE_ARTICLE,
} from './constants';

import {

    articleRejected,
    articleRejectionError,

    articleLoaded,
    articleLoadingError,

    articleDeleted,
    articleDeletionError,

    articleDelegated,
    articleDelegationError,

    articleFinished,
    articleFinishError,

    articlePublished,
    articlePublishError,

    articleSendedToFix,
    articleToFixError,
} from './actions';

import * as api from 'api';

export function* getArticle({ payload }) {
    try {
        const { data } = yield call(api.getArticle, payload);

        yield put(articleLoaded(data));
    } catch (err) {
        yield put(articleLoadingError(err));
    }
}

export function* deleteArticle({ payload }) {
    try {
        yield call(api.deleteArticle, payload);

        yield put(articleDeleted());

        yield put(push('/newslist'));
    } catch (err) {
        yield put(articleDeletionError(err));
    }
}

export function* delegateArticle({ payload }) {
    try {
        yield call(api.delegateArticle, payload);

        yield put(articleDelegated());
    } catch (err) {
        yield put(articleDelegationError(err));
    }
}

function* uploadFile(file, info) {
    if (!file || Number.isInteger(file)) {
        return file;
    }

    const { data: { file: { id } } } = yield call(api.uploadFile, file, info);
    return id;
}

function* uploadFiles(data) {
    const result = {};
    const files = ['image_main', 'image_preview', 'video_stream_preview'];

    if (typeof data.video_stream !== 'string') {
        files.push('video_stream');
    }

    const responses = yield files.map((file) => call(uploadFile, data[file], data[`${file}_info`]));

    files.forEach((file, ind) => { result[file] = responses[ind]; });

    return result;
}

export function* finishArticle({ payload }) {
    try {
        yield put(showPreloader());
        const uploadedFiles = yield call(uploadFiles, payload);
        const data = { ...payload, ...uploadedFiles };

        data.uri = `rtvi.com/${data.id}-${translit(data.title)}`;

        yield call(api.finishArticle, data);

        yield put(hidePreloader());
        toastr.success('Изменения сохранены');

        yield put(articleFinished());

        // yield put(push(`/newslist`))
    } catch (err) {
        console.error(err);
        yield put(hidePreloader());
        toastr.error('Что-то пошло не так...');
        yield put(articleFinishError(err));
    }
}

export function* publishArticle({ payload }) {
    try {
        yield put(showPreloader());
        const uploadedFiles = yield call(uploadFiles, payload);
        const data = { ...payload, ...uploadedFiles };

        data.uri = `rtvi.com/${data.id}-${translit(data.title)}`;

        const { data: response } = yield call(api.finishArticle, data);

        yield call(api.publishArticle, response.id);

        yield put(hidePreloader());
        toastr.success('Новость опубликована');

        yield put(articlePublished());

        // yield put(push(`/newslist`))
    } catch (err) {
        console.log(err);
        yield put(hidePreloader());
        toastr.error('Что-то пошло не так...');
        yield put(articlePublishError(err));
    }
}

function* toFixArticle({ payload }) {
    try {
        yield call(api.toFixArticle, payload);

        yield put(articleSendedToFix());
    } catch (err) {
        yield put(articleToFixError(err));
    }
}

export function* rejectArticle({ payload }) {
    try {
        let id = payload

        if (typeof id == 'object') {

            // чтобы пользователь мог отказаться от новости, он должен
            // быть ее редактором
            const user = yield select(selectCurrentUser)
            id.editor_id = user.id

            const { data } = yield call(api.finishArticle, id)
            id = data.id
        }

        yield call(api.rejectArticle, id)

        yield put(articleRejected(id))

        yield put(push(`/newslist`))

        yield fork(getList)
    } catch (err) {
        yield put(articleRejectionError(err))
    }
}

export function* articleData() {
    yield takeLatest(LOAD_ARTICLE, getArticle);

    yield takeLatest(TO_FIX_ARTICLE, toFixArticle);

    yield takeLatest(FINISH_ARTICLE, finishArticle);

    yield takeLatest(PUBLISH_ARTICLE, publishArticle);

    yield takeEvery(DELEGATE_ARTICLE, delegateArticle);

    yield takeEvery(DELETE_ARTICLE, deleteArticle);

    yield takeEvery(REJECT_ARTICLE, rejectArticle);
}

export default [
    articleData,
];


function translit(value) {
    // Символ, на который будут заменяться все спецсимволы
    const space = '-';
    // Берем значение из нужного поля и переводим в нижний регистр
    const text = value.toLowerCase();

    // Массив для транслитерации
    /* eslint-disable */
    const transl = {
        А: 'A', Б: 'B', В: 'V', Г: 'G', Д: 'D', Е: 'E', Ё: 'E', Ж: 'ZH',
        З: 'Z', И: 'I', Й: 'J', К: 'K', Л: 'L', М: 'M', Н: 'N',
        О: 'O', П: 'P', Р: 'R', С: 'S', Т: 'T', У: 'U', Ф: 'F', Х: 'H',
        Ц: 'C', Ч: 'CH', Ш: 'SH', Щ: 'SH', Ъ: space, Ы: 'Y', Ь: space, Э: 'E', Ю: 'YU', Я: 'YA',
        а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh',
        з: 'z', и: 'i', й: 'j', к: 'k', л: 'l', м: 'm', н: 'n',
        о: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ф: 'f', х: 'h',
        ц: 'c', ч: 'ch', ш: 'sh', щ: 'sh', ъ: space, ы: 'y', ь: space, э: 'e', ю: 'yu', я: 'ya',
        ' ': space, _: space, '`': space, '~': space, '!': space, '@': space,
        '#': space, $: space, '%': space, '^': space, '&': space, '*': space,
        '(': space, ')': space, '-': space, '\=': space, '+': space, '[': space,
        ']': space, '\\': space, '|': space, '/': space, '.': space, ',': space,
        '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
        '?': space, '<': space, '>': space, '№': space,
    };
    /* eslint-enable */

    let result = '';
    let curentSym = '';

    for (let i = 0; i < text.length; i++) {
        // Если символ найден в массиве то меняем его
        if (transl[text[i]] != undefined) {
            if (curentSym != transl[text[i]] || curentSym != space) {
                result += transl[text[i]];
                curentSym = transl[text[i]];
            }
        }
        // Если нет, то оставляем так как есть
        else {
            result += text[i];
            curentSym = text[i];
        }
    }

    result = TrimStr(result);

    // Выводим результат
    return result;
}

function TrimStr(s) {
    s = s.replace(/^-/, '');
    return s.replace(/-$/, '');
}
