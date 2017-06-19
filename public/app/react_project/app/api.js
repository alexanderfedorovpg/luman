import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = process.env.API_ENDPOINT;

const publicApi = axios.create({
    baseURL: process.env.API_ENDPOINT_PUBLIC,
});

// =============================================================================
// AUTH API
// =============================================================================

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

// ============================================================================


// =============================================================================
// USERS API
// =============================================================================

export const getUser = (id, params) => axios.get(`/user${id ? `/${id}` : ''}`, {
    params,
});
export const addUser = (data) => axios.post('/user', data);
export const deleteUser = (id) => axios.delete(`/user/${id}`);
export const editUser = (id, data) => axios.put(`/user/${id}`, data);

export const getCurrentUser = () => axios.get('/userprofile');
export const editUserProfile = (data) => axios.put('/userprofile', data);

export const getUsersInGroup = (groupId) => axios.get(`/group/${groupId}/users`);
export const addUserToGroup = (groupId, userId) => axios.post(`/group/${groupId}/bind/${userId}`);
export const getGroup = (id) => axios.get(`/group${id ? `/${id}` : ''}`);
export const getGroups = () => axios.get('/group');
export const addGroup = (data) => axios.post('/group', data);
export const editGroup = (id, data) => axios.put(`/group/${id}`, data);
export const deleteGroup = (id) => axios.delete(`/group/${id}`);
export const getGroupPermissions = (id) => axios.get(`group/${id}/permiss`);
export const editGroupPermissions = (id, permissions) => axios.post(`group/${id}/permiss`, { permissions });

export const getPermissionsList = () => axios.get('permission');

// ============================================================================


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
        rubrics,
        keywords,
        editor,
        online_editor,
        video_group,
        rating,
        header,
    } = data;

    const formData = {
        action: 'work',
        id,
        rubrics,
        keywords: keywords.join(','),
        editor_id: editor,
        online_editor_id: online_editor,
        video_group: (Array.isArray(video_group)
            ? video_group
            : [video_group, 2, 5]).filter(v => v).join(','),
        top: rating,
        header
    }

    return axios.post('/newsfeed/work', qs.stringify(formData), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const getLinks = (query) => axios.get('/reference/search', {
    params: { query },
});

export const getNewslist = () => axios.get('/newslisteditor', {
    params: {
        is_publish: false,
        orderBy: 'id',
        orderType: 'desc'
    }
});

export const getTags = () => axios.get('/tags');

export const getRubrics = () => axios.get('/rubrics');

export const getArticle = (id) => axios.get(`/newseditor/${id}`);

export const deleteArticle = (id) => axios.delete(`/newseditor/${id}`);

export const delegateArticle = (params) => axios.post('/newseditor/delegate', qs.stringify(params));

export const rejectArticle = (id) => axios.post('/newseditor/rejection', {
    id,
});

export const removeArticleFromConstructor = (id) => axios.put('/newseditor/trigger_vc', { id });

export const finishArticle = (data) => {

    if (data.id) {
        return axios.put(
            '/newseditor/edit',
            qs.stringify({
                ...data,
                moderation: 1,
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
    }
    else {
        return axios.post(
            '/newseditor',
            qs.stringify({
                ...data,
                moderation: 1
            }),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
    }
};

// export const publishArticle = (data) => {
//     const formData = qs.stringify(data);

//     return axios.put('/newseditor', formData, {
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//     });
// };

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

export const getReadyNews = (params) => axios.get('/newseditor/moderated', {
    params: {
        orderBy: 'id',
        orderType: 'desc',
        ...params,
    }
});

export const publishArticle = (id) => axios.put(`/newseditor/publish/${id}`);

// =============================================================================
// File API
// =============================================================================

/**
 * отдает превьюшку для видео справа на странице, на сайте
 * @returns {AxiosPromise}
 */
export const loadCoverImg = () => {
    return axios.get('/air/cover');
}

export const uploadCoverImg = (id) => {
    return axios.post('/air/cover', {value: id})
}

export const uploadFile = (file, data = {}) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('object_name', data.object_name || '');
    formData.append('object_author', data.object_author || '');
    formData.append('object_source', data.object_source || '');

    return data.id

        ? axios.put('/file', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })

        : axios.post('/file', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        })
};

export const getFiles = () => axios.get(`/file`);

// =============================================================================
// Chat API
// =============================================================================
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

// =============================================================================
// Constructor API
// =============================================================================

export const getConstructorCategories = () => axios.get('/homepage/newscategory');
export const getHomepageNews = () => axios.get('/homepage');
export const getConstructorNews = (params) => axios.get('/newslist', {
    params: {
        ...params,
        orderBy: 'publish_date',
        orderType: 'desc',
        constructor: true
    }
});
export const saveHomepageNews = (data) => axios.put('/homepage', qs.stringify(data), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
// =============================================================================

// =============================================================================
// Translation API
// =============================================================================

export const getOnlines = () => axios.get(`/news/onlines`);
export const getOnlineComments = id => axios.get(`/news/online/comments/${id}`);
export const postOnlineComment = data => axios.post(`/news/online/comments`, qs.stringify(data), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
export const putOnlineComment = data => axios.put(`/news/online/comments`, qs.stringify(data), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
export const deleteOnlineComment = id => axios.delete(`/news/online/comments/${id}`);
export const putArticleCover = data => axios.put(`/newseditor/cover`, qs.stringify(data), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
export const putArticleTitle = data => axios.put(`/newseditor/title`, qs.stringify(data), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
export const putArticleTheses = data => axios.put(`/newseditor/theses`, qs.stringify(data), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
});
export const toggleOnlineStatus = id => axios.get(`/news/online/setstatus/${id}`);
export const getPublicOnline = () => publicApi.get('/news/comments');
// =============================================================================

// =============================================================================
// RECORDS AND PROGRAMS API
// =============================================================================

export const getPrograms = () => axios.get('/tv-program');
export const getRecords = (params) => axios.get('/air/record', {
    params: {
        ...params,
        orderBy: 'publish_date',
        orderType: 'desc',
    },
});
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
export const removeRecordFromConstructor = (id) => axios.put('/air/record/trigger_vc', { id });

// =============================================================================


// =============================================================================
// STATISTIC API
// =============================================================================

export const getCategoryStats = (from_date, to_date) => axios.get('/statistics');
export const getAuthorStats = (from_date, to_date) => axios.get('/newsstatistics/editor/top');
export const getOneCategoryStat = (type, from_date, to_date) => axios.get(`/newsstatistics/editor/extended?type=${type}`);
export const getOneAuthorStats = (editor_id, from_date, to_date) => axios.get(`/newsstatistics/editor?editor_id=${editor_id}`);

// =============================================================================


// =============================================================================
// LIVE API
// =============================================================================

export const getLive = () => axios.get('/air/live');
export const newsToLive = (data) => axios.post('/air/live', data);

// =============================================================================


// =============================================================================
// LOGS API
// =============================================================================

export const getLogs = (params) => axios.get('/logs', { params });
export const getUserLogs = (params) => axios.get('/logs/user', { params });

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
