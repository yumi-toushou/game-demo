import axios from 'axios'

const app = axios.create()

app.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token')
    return config
})

app.interceptors.response.use((res) => {
    if (res.data.code !== 0) {
        return Promise.reject(res.data.error)
    }
    return res.data
}, error => {
    return error.response.data
})

export default app;