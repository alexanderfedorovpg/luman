import axios from 'axios'

const baseUrl = `http://librorum.rtvi.ddemo.ru/api/v1`

export const getFeed = () => {
    return axios.get(`${baseUrl}/newsfeed`)
}

export const hideFeedItem = (config) => {
    return axios.post(`${baseUrl}/newsfeed`, config)
}

export const feedToWork = (id, config) => {
    return axios.post(`${baseUrl}/work/{$id}`, config)
}

export default axios
