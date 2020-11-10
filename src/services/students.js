import api from './api'

export default {
  index(params) {
    return api().get('/students', { params })
  },
  show(id, simplified) {
    return api().get(`/students/${id}`, {
      params: {
        simplified,
      },
    })
  },
  generate() {
    return api().post('/students/generate')
  },
  update(params) {
    return api().put(`/students/${params.id}`, params)
  },
}
