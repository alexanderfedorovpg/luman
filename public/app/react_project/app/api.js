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
        top,
        rating
    } = data

    return axios.post(`${baseUrl}/work/${id}`, {
            action: 'work',
            id,
            tags: tags.join(', '),
            keywords: keywords.join(', '),
            editor_id: editor,
            top: rating
        })
}

export const getUser = (id, params) => {
    return axios.get(`${baseUrl}/user${id ? `/${id}` : ''}`, {
        params
    })
}

export const getGroup = id => {
    return axios.get(`${baseUrl}/group${id ? `/${id}` : ''}`)
}

export const getPermissions = () => {
    return axios.get(`${baseUrl}/permission`)
}

export default axios
