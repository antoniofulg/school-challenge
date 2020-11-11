import api from './api'

export default {
  index(params) {
    return api().get('/teachers', { params })
  },
  create(params) {
    return api().post('/teachers/', params)
  },
  show(id, simplified) {
    return api().get(`/teachers/${id}`, {
      params: {
        simplified,
      },
    })
  },
  update(params) {
    return api().put(`/teachers/${params.id}`, params)
  },
}
