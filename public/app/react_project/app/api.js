import axios from 'axios';

const baseUrl = 'http://librorum.rtvi.ddemo.ru/api/v1';

export const setToken = (token) => {
    axios.defaults.headers.common['Api-Token'] = token;
};

export const login = ({ username, password }) => {
    const formData = new FormData();

    formData.append('login', username);
    formData.append('password', password);

    return axios.post(`${baseUrl}/auth/login`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const getFeed = (params) => axios.get(`${baseUrl}/newsfeed`, {
    params: {
        ...params,
    },
});

export const hideFeedItem = (id) => axios.post(`${baseUrl}/newsfeed`, {
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

    return axios.post(`${baseUrl}/newsfeed/work`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const getUser = (id, params) => axios.get(`${baseUrl}/user${id ? `/${id}` : ''}`, {
    params,
});

export const getCurrentUser = () => axios.get(`${baseUrl}/userprofile`);

export const getUsersInGroup = (group_id) => axios.get(`${baseUrl}/group/${group_id}/users`);

export const getGroup = (id) => axios.get(`${baseUrl}/group${id ? `/${id}` : ''}`);

export const getLinks = (query) => axios.get(`${baseUrl}/reference/search`, {
    params: {
        query,
    },
});

export const getNewslist = () => axios.get(`${baseUrl}/newslisteditor`);

export const getTags = () => axios.get(`${baseUrl}/tags`);

export const getRubrics = () => axios.get(`${baseUrl}/rubrics`);

export const getArticle = (id) => axios.get(`${baseUrl}/newseditor/${id}`);

export const rejectArticle = (id) => axios.post(`${baseUrl}/newseditor/rejection`, {
    id,
});

export const acceptArticle = (id) => axios.post(`${baseUrl}/newseditor/work`, {
    id,
});

export const publishArticle = () => axios.post(`${baseUrl}/`);

export const getChatMessages = (room) => axios.get(`${baseUrl}/newschat/${room}`);

export const postChatMessage = (room, { message, files }) => {
    const formData = new FormData();

    formData.append('message', message);
    formData.append('files', files);

    return axios.post(`${baseUrl}/newschat/${room}`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const uploadFile = (file) => {
    const formData = new FormData();

    formData.append('file', file);

    return axios.post(`${baseUrl}/file`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
};

export const getPrograms = () => axios.get(`${baseUrl}/tv-program`);

export default axios;
