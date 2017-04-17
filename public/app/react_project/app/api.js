import axios from 'axios'

const baseUrl = `http://librorum.rtvi.ddemo.ru/api/v1`

export const setToken = token => {
    axios.defaults.headers.common['Api-Token'] = token
}

export const login = ({ username, password }) => {
    let formData = new FormData()

    formData.append('login', username)
    formData.append('password', password)

    return axios.post(`${baseUrl}/auth/login`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getFeed = params => {
    return axios.get(`${baseUrl}/newsfeed`, {
        params: {
            ...params
        }
    })
}

export const hideFeedItem = id => {
    return axios.post(`${baseUrl}/newsfeed`, {
            action: 'hide',
            id
        })
}

export const feedToWork = data => {
    let {
        id,
        tags,
        keywords,
        editor,
        online_editor,
        video_group,
        rating,
        header
    } = data

    let formData = new FormData()

    video_group = Array.isArray(video_group)
        ? video_group
        : [video_group, 2, 5]

    formData.append('action', 'work')
    formData.append('id', id)
    formData.append('tags', tags)
    formData.append('keywords', keywords)
    formData.append('editor_id', editor)
    formData.append('online_editor_id', online_editor)
    formData.append('video_group', video_group)
    formData.append('top', rating)
    formData.append('header', header)

    return axios.post(`${baseUrl}/newsfeed/work`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const getUser = (id, params) => {
    return axios.get(`${baseUrl}/user${id ? `/${id}` : ''}`, {
        params
    })
}

export const getCurrentUser = () => {
    return axios.get(`${baseUrl}/userprofile`)
}

export const getUsersInGroup = group_id => {
    return axios.get(`${baseUrl}/group/${group_id}/users`)
}

export const getGroup = id => {
    return axios.get(`${baseUrl}/group${id ? `/${id}` : ''}`)
}

export const getLinks = query => {
    return axios.get(`${baseUrl}/reference/search`, {
        params: {
            query: query
        }
    })
}

export const getNewslist = () => {
    return axios.get(`${baseUrl}/newslisteditor`)
}

export const getTags = () => {
    return axios.get(`${baseUrl}/tags`)
}

export const getRubrics = () => {
    return axios.get(`${baseUrl}/rubrics`)
}

export const getArticle = id => {
    return axios.get(`${baseUrl}/newseditor/${id}`)
}

export const rejectArticle = id => {
    return axios.post(`${baseUrl}/newseditor/rejection`, {
        id
    })
}

export const acceptArticle = id => {
    return axios.post(`${baseUrl}/newseditor/work`, {
        id
    })
}

export const publishArticle = () => {
    return axios.post(`${baseUrl}/`)
}

export const getChatMessages = room => {
    return axios.get(`${baseUrl}/newschat/${room}`)
}

export const postChatMessage = (room, { message, files }) => {
    let formData = new FormData()

    formData.append('message', message)
    formData.append('files', files)

    return axios.post(`${baseUrl}/newschat/${room}`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export const uploadFile = file => {
    let formData = new FormData()

    formData.append('file', file)

    return axios.post(`${baseUrl}/file`, formData, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
}

export default axios
