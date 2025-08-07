<template>
  <div class="container py-5">
    <AdminRestaurantForm 
      :initial-restaurant="restaurant" 
      :is-processing="isProcessing" 
      @after-submit="handleAfterSubmit"
     />
  </div>
</template>

<script>
import AdminRestaurantForm from './../components/AdminRestaurantForm.vue'
import adminAPI from './../apis/admin'
import { Toast } from '../utils/helpers'

// const dummyData = {
//   'restaurant': {
//     'id': 1,
//     'name': 'Laurence Reynolds',
//     'tel': '1-657-067-3756 x9782',
//     'address': '187 Kirlin Squares',
//     'opening_hours': '08:00',
//     'description': 'sit est mollitia',
//     'image': 'https://loremflickr.com/320/240/restaurant,food/?random=91.29816290184887',
//     'CategoryId': 3
//   }
// }

export default {
  name: 'AdminRestaurantEdit',
  components: {
    AdminRestaurantForm
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        tel: '',
        address: '',
        openingHours: '',
        description: '',
        image: '',
        categoryId: ''
      },
      isProcessing: false
    }
  },
  created () {
    const { id } = this.$route.params
    this.fetchRestaurant(id)
  },
  beforeRouteUpdate(to, from, next) {
    // console.log('beforeRouteUpdate', {
    //   to, from
    // })
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        const { data } = await adminAPI.restaurants.getDetail({ restaurantId })
        // console.log('restaurantId', restaurantId)
        const { id, name, tel, address, opening_hours: openingHours, description, image, CategoryId: categoryId } = data.restaurant
        
        this.restaurant = {
          ...this.restaurant,
          id,
          name,
          tel,
          address,
          description,
          image,
          openingHours,
          categoryId
        }
      } catch (error) {
        // console.log('error', error)
        Toast.fire ({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    async handleAfterSubmit (formData) {
      try {
        this.isProcessing = true
        const { data } = await adminAPI.restaurants.update({ restaurantId: this.restaurant.id, formData })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        this.$router.push({ name: 'admin-restaurants' })
      } catch (error) {
        this.isProcessing = false
        Toast.fire({
          icon: 'error',
          title: '無法更新餐廳資料，請稍後再試'
        })
      }
      // 透過 API 將表單資料送到伺服器
      for (let [name, value] of formData.entries()) {
        console.log(name + ': ' + value)
      }
    }
  }
}
</script>