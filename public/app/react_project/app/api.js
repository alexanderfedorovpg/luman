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
        params
    })
}

export const hideFeedItem = (config) => {
    return axios.post(`${baseUrl}/newsfeed`, config)
}

export const feedToWork = (id, config) => {
    return axios.post(`${baseUrl}/work/{$id}`, config)
}

export const getUser = () => {
    return axios.get(`${baseUrl}/user`)
}

export default axios
