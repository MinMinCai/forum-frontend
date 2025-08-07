import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  categories: {
    get () {
      return apiHelper.get('/admin/categories')
    }
  },
  restaurants: {
    getDetail ({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    get () {
      return apiHelper.get('/admin/restaurants')
    },
    create ({ formData }) {
      return apiHelper.post('/admin/restaurants', formData)
    }
  },
  delete ({ restaurantId }) {
    return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
  },
  update ({ restaurantId, formData }) {
    return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
  }
}