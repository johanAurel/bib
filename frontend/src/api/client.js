import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

client.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true
      try {
        const refreshToken = localStorage.getItem('refresh_token')
        if (!refreshToken) throw new Error('No refresh token')

        const response = await axios.post('/api/token/refresh/', {
          refresh: refreshToken,
        })

        localStorage.setItem('access_token', response.data.access)
        client.defaults.headers.Authorization = `Bearer ${response.data.access}`
        originalRequest.headers.Authorization = `Bearer ${response.data.access}`

        return client(originalRequest)
      } catch (refreshError) {
        localStorage.removeItem('access_token')
        localStorage.removeItem('refresh_token')
        window.location.href = '/admin-portal'
        return Promise.reject(refreshError)
      }
    }
    return Promise.reject(error)
  }
)

export default client
