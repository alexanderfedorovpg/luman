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
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getUser = (id, params) => {
    return axios.get(`/user${id ? `/${id}` : ''}`, {
        params
    })
}

export const getCurrentUser = () => {
    return axios.get('/userprofile')
}

export const getUsersInGroup = group_id => {
    return axios.get(`/group/${group_id}/users`)
}

export const getGroup = id => {
    return axios.get(`/group${id ? `/${id}` : ''}`)
}

export const getLinks = query => {
    return axios.get('/reference/search', {
        params: {
            query: query
        }
    })
}

export const getNewslist = () => {
    return axios.get('/newslisteditor')
}

export const getNews = (params) => publicApi.get('/news', {
    headers: {},
    params,
});

export const getTags = () => {
    return axios.get('/tags')
}

export const getRubrics = () => {
    return axios.get('/rubrics')
}

export const getArticle = id => {
    return axios.get(`/newseditor/${id}`)
}

export const deleteArticle = id => {
    return axios.delete(`/newseditor/${id}`)
}

export const delegateArticle = id => {
    return axios.post('/newseditor/delegate', {
        id
    })
}

export const rejectArticle = id => {
    return axios.post('/newseditor/rejection', {
        id
    })
}

export const finishArticle = data => {
    let formData = xwwwfurlenc({
        ...data,
        action: 'edit'
    })

    return axios.put('/newseditor/edit', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const publishArticle = data => {
    let formData = xwwwfurlenc(data)

    return axios.post('/newseditor', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const toFixArticle = id => {
    let formData = xwwwfurlenc({ id })

    return axios.post('/newseditor/tofix', formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}


// TODO: найти нормальный npm пакет для конвертации
//       json -> x-www-form-urlencoded
function xwwwfurlenc(srcjson){
    var u = encodeURIComponent;
    var urljson = "";
    var keys = Object.keys(srcjson);
    for(var i=0; i <keys.length; i++){
        urljson += u(keys[i]) + "=" + u(srcjson[keys[i]]);
        if(i < (keys.length-1))urljson+="&";
    }
    return urljson;
}

export const acceptArticle = id => {
    return axios.post('/newseditor/work', {
        id
    })
}

export const getChatMessages = room => {
    return axios.get(`/newschat/${room}`)
}

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

export const getReadyNews = params => axios.get('/newseditor/moderated', {
    params,
});

export const publishModeratedArticle = id => axios.put(`/newseditor/publish/${id}`)

// =============================================================================
// Constructor API
// =============================================================================

export const getConstructorCategories = () => axios.get('/homepage/newscategory')
export const getHomepageNews = () => axios.get('/homepage')
export const getConstructorNews = params => axios.get('/newslist', { params })
export const saveHomepageNews = data => axios.put('/homepage', qs.stringify(data), {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

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

export const getCategoryStats = (from_date, to_date) => axios.get('/statistics');
export const getAuthorStats = (from_date, to_date) => axios.get('/newsstatistics/editor/top');
export const getOneCategoryStat = (type, from_date, to_date) => axios.get(`/statistics?type=${type}`);
export const getOneAuthorStats = (editor_id, from_date, to_date) => axios.get(`/newsstatistics/editor/?editor_id?${editor_id}`);


export default axios;
