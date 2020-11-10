import api from './api'

export default {
  index(params) {
    return api().get('/degrees', { params })
  },
  students() {
    return api().get(`/degrees/students`)
  },
}
