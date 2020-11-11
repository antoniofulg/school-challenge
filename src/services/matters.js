import api from './api'

export default {
  index(params) {
    return api().get('/matters', { params })
  },
}
