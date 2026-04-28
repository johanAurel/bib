import client from './client'

export const portfolioAPI = {
  investments: {
    list: (sector) =>
      client.get('/investments/', { params: sector ? { sector } : {} }),
    get: (id) => client.get(`/investments/${id}/`),
    create: (data) => client.post('/investments/', data),
    update: (id, data) => client.patch(`/investments/${id}/`, data),
    delete: (id) => client.delete(`/investments/${id}/`),
  },

  stats: {
    list: () => client.get('/stats/'),
    get: (id) => client.get(`/stats/${id}/`),
    update: (id, data) => client.patch(`/stats/${id}/`, data),
  },

  contact: {
    submit: (data) => client.post('/contact/', data),
    list: () => client.get('/contact-messages/'),
    markRead: (id) => client.patch(`/contact-messages/${id}/`, { read: true }),
  },

  auth: {
    login: (username, password) =>
      client.post('/token/', { username, password }),
  },
}

export default portfolioAPI
