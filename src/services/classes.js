import api from './api'

export default {
  index(params) {
    return api().get('/classes', { params })
  },
  show(id, simplified) {
    return api().get(`/classes/${id}`, {
      params: {
        simplified,
      },
    })
  },
}
