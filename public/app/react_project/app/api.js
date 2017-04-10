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
    // formData.append('online_editor_id', online_editor)
    // formData.append('video_group', video_group)
    formData.append('top', rating)
    formData.append('header', header)

    // formData.append('action', 'work')
    // formData.append('id', '37')
    // formData.append('tags', ['asdf', 'asf'])
    // formData.append('keywords', ['asdf', 'asf'])
    // formData.append('editor_id', '2')
    // formData.append('top', '1')
    // formData.append('header', 'asdfsfsadf')

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

export const getUsersInGroup = group_id => {
    return axios.get(`${baseUrl}/group/${group_id}/users`)
}

export const getGroup = id => {
    return axios.get(`${baseUrl}/group${id ? `/${id}` : ''}`)
}

export const getPermissions = () => {
    return axios.get(`${baseUrl}/permission`)
}

export default axios
