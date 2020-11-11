import api from './api'

export default {
  index(params) {
    return api().get('/profiles', { params })
  },
  create(params) {
    return api().post('/profiles', params)
  },
  show(id, simplified) {
    return api().get(`/profiles/${id}`, {
      params: {
        simplified,
      },
    })
  },
  update(params) {
    return api().put(`/profiles/${params.id}`, params)
  },
}
