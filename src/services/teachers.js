import api from './api'

export default {
  index(params) {
    return api().get('/teachers', { params })
  },
  show(id, simplified) {
    return api().get(`/teachers/${id}`, {
      params: {
        simplified,
      },
    })
  },
  update(params) {
    console.log(params)
    return api().put(`/teachers/${params.id}`, params)
  },
}
