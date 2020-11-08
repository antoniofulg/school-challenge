import api from './api'

export default {
  index(params) {
    return api().get('/degrees', { params })
  },
  show(id, simplified) {
    return api().get(`/degrees/${id}`, {
      params: {
        simplified,
      },
    })
  },
}
