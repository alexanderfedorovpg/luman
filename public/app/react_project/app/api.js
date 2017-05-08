import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = 'http://librorum.rtvi.ddemo.ru/api/v1';

const publicApi = axios.create({
    baseURL: 'http://librorum-client.rtvi.ddemo.ru/api/v1/web',
});

export const setToken = (token) => {
    axios.defaults.headers.common['Api-Token'] = token;
};

export const login = ({ username, password }) => {
    const formData = new FormData();

    formData.append('login', username);
    formData.append('password', password);

    return axios.post('/auth/login', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const getFeed = (params) => axios.get('/newsfeed', {
    params: {
        ...params,
    },
});

export const hideFeedItem = (id) => axios.post('/newsfeed', {
    action: 'hide',
    id,
});

export const feedToWork = (data) => {
    let {
        id,
        tags,
        keywords,
        editor,
        online_editor,
        video_group,
        rating,
        header,
    } = data;

    const formData = new FormData();

    video_group = Array.isArray(video_group)
        ? video_group
        : [video_group, 2, 5];

    formData.append('action', 'work');
    formData.append('id', id);
    formData.append('tags', tags);
    formData.append('keywords', keywords);
    formData.append('editor_id', editor);
    formData.append('online_editor_id', online_editor);
    formData.append('video_group', video_group);
    formData.append('top', rating);
    formData.append('header', header);

    return axios.post('/newsfeed/work', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const getUser = (id, params) => axios.get(`/user${id ? `/${id}` : ''}`, {
    params,
});

export const getCurrentUser = () => axios.get('/userprofile');

export const getUsersInGroup = (group_id) => axios.get(`/group/${group_id}/users`);

export const getGroup = (id) => axios.get(`/group${id ? `/${id}` : ''}`);

export const getLinks = (query) => axios.get('/reference/search', {
    params: { query },
});

export const getNewslist = () => axios.get('/newslisteditor');

export const getTags = () => axios.get('/tags');

export const getRubrics = () => axios.get('/rubrics');

export const getArticle = (id) => axios.get(`/newseditor/${id}`);

export const deleteArticle = (id) => axios.delete(`/newseditor/${id}`);

export const delegateArticle = (id) => axios.post('/newseditor/delegate', {
    id,
});

export const rejectArticle = (id) => axios.post('/newseditor/rejection', {
    id,
});

export const finishArticle = (data) => {
    const formData = xwwwfurlenc({
        ...data,
        action: 'edit',
    });

    return axios.put('/newseditor/edit', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const publishArticle = (data) => {
    const formData = xwwwfurlenc(data);

    return axios.post('/newseditor', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const toFixArticle = (id) => {
    const formData = xwwwfurlenc({ id });

    return axios.post('/newseditor/tofix', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};


// TODO: найти нормальный npm пакет для конвертации
//       json -> x-www-form-urlencoded
function xwwwfurlenc(srcjson) {
    let u = encodeURIComponent;
    let urljson = '';
    let keys = Object.keys(srcjson);
    for (let i = 0; i < keys.length; i++) {
        urljson += `${u(keys[i])  }=${  u(srcjson[keys[i]])}`;
        if (i < (keys.length - 1))urljson += '&';
    }
    return urljson;
}

export const acceptArticle = (id) => axios.post('/newseditor/work', {
    id,
});

export const getChatMessages = (room) => axios.get(`/newschat/${room}`);

export const postChatMessage = (room, { message, files }) => {
    const formData = new FormData();

    formData.append('message', message);
    formData.append('files', files);

    return axios.post(`/newschat/${room}`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const uploadFile = (file) => {
    const formData = new FormData();

    formData.append('file', file);

    return axios.post('/file', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const getReadyNews = (params) => axios.get('/newseditor/moderated', {
    params,
});

export const publishModeratedArticle = (id) => axios.put(`/newseditor/publish/${id}`);

// =============================================================================
// Constructor API
// =============================================================================

export const getConstructorCategories = () => axios.get('/homepage/newscategory');
export const getHomepageNews = () => axios.get('/homepage');
export const getConstructorNews = (params) => axios.get('/newslist', { params });
export const saveHomepageNews = (data) => axios.put('/homepage', qs.stringify(data), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
// =============================================================================

// =============================================================================
// RECORDS AND PROGRAMS API
// =============================================================================

export const getPrograms = () => axios.get('/tv-program');
export const getRecords = (params) => axios.get('/air/record', { params });
export const getRecord = (id) => axios.get(`/air/record/${id}`);
export const deleteRecord = (id) => axios.delete(`/air/record/${id}`);
export const postRecord = (data) => axios.post('/air/record', data);
export const editRecord = (id, data) => axios.put(`/air/record/${id}`, data);
export const publishRecords = (data) => axios.put('/air/record/publish', data);
export const uploadVideo = (file) => {
    const data = new FormData();
    data.append('file', file);

    return axios.post('/air/record/upload', data);
};
// =============================================================================

// =============================================================================
// STATISTIC API
// =============================================================================
export const getCategoryStats = (from_date, to_date) => axios.get('/statistics');
export const getAuthorStats = (from_date, to_date) => axios.get('/newsstatistics/editor/top');
export const getOneCategoryStat = (type, from_date, to_date) => axios.get(`/newsstatistics/editor/extended?type=${type}`);
export const getOneAuthorStats = (editor_id, from_date, to_date) => axios.get(`/newsstatistics/editor?editor_id=${editor_id}`);

// =============================================================================
// LIVE API
// =============================================================================

export const getLive = () => axios.get('/air/live');
export const newsToLive = (data) => axios.post('/air/live', data);
// =============================================================================

// =============================================================================
// PUBLIC API
// =============================================================================

export const getNews = (params) => publicApi.get('/news', {
    headers: {
        'Api-Token': null,
    },
    params,
});

export default axios;
