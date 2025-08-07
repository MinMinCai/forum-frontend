<template>
  <div class="container py-5">
    <!-- 餐廳資訊頁 RestaurantDetail -->
     <RestaurantDetail 
       :initial-restaurant="restaurant"
     />
    <hr>
    <!-- 餐廳評論 RestaurantComments -->
     <RestaurantComments
      :restaurantComments="restaurantComments" 
      @after-delete-comment="afterDeleteComment"
     />
    <!-- 新增評論 CreateComment -->
     <CreateComment 
     :restaurant-id="restaurant.id"
     @after-create-comment="afterCreateComment"
     />
  </div>
</template>

<script>
import RestaurantDetail from '../components/RestaurantDetail.vue';
import RestaurantComments from '../components/RestaurantComments.vue';
import CreateComment from '../components/CreateComment.vue';
import restaurantAPI from './../apis/restaurants'
import { Toast } from '../utils/helpers';
import { mapState } from 'vuex';

// const dummyData = {
//     "restaurant": {
//         "id": 1,
//         "name": "Judy Runte",
//         "tel": "(918) 827-1962",
//         "address": "98138 Elisa Road",
//         "opening_hours": "08:00",
//         "description": "dicta et cupiditate",
//         "image": "https://loremflickr.com/320/240/food,dessert,restaurant/?random=1",
//         "createdAt": "2019-06-22T09:00:43.000Z",
//         "updatedAt": "2019-06-22T09:00:43.000Z",
//         "CategoryId": 3,
//         "Category": {
//             "id": 3,
//             "name": "義大利料理",
//             "createdAt": "2019-06-22T09:00:43.000Z",
//             "updatedAt": "2019-06-22T09:00:43.000Z"
//         },
//         "FavoritedUsers": [],
//         "LikedUsers": [],
//         "Comments": [
//             {
//                 "id": 3,
//                 "text": "Quos asperiores in nostrum cupiditate excepturi aspernatur.",
//                 "UserId": 2,
//                 "RestaurantId": 1,
//                 "createdAt": "2019-06-22T09:00:43.000Z",
//                 "updatedAt": "2019-06-22T09:00:43.000Z",
//                 "User": {
//                     "id": 2,
//                     "name": "user1",
//                     "email": "user1@example.com",
//                     "password": "0ma2m0mISHJI48xu/VRNVmEeycFe8v5ChyT305f8KaJVIhumu7M/eKAikkm",
//                     "image": "https://i.imgur.com/XooCt5K.png",
//                     "isAdmin": false,
//                     "createdAt": "2019-06-22T09:00:43.000Z",
//                     "updatedAt": "2019-06-23T01:16:31.000Z"
//                 }
//             }
//         ]
//     },
//     "isFavorited": false,
//     "isLiked": false
// }

// const dummyUser = {
//   currentUser: {
//     'id': 1,
//     'name': 'root1',
//     'email': 'root@example.com',
//     'image': null,
//     'isAdmin': true
//   },
//   isAuthenticated: true
// }

export default {
  components: {
    RestaurantDetail,
    RestaurantComments,
    CreateComment
  },
  data () {
    return {
      restaurant: {
        id: -1,
        name: '',
        categoryName: '',
        image: '',
        openingHours: '',
        tel: '',
        address: '',
        description: '',
        isFavorited: false,
        isLiked: false
      },
      restaurantComments: [],
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  beforeRouteUpdate (to, from, next) {
    const { id } = to.params
    this.fetchRestaurant(id)
    next()
  },
  created () {
    const { id: restaurantId } = this.$route.params
    this.fetchRestaurant(restaurantId)
  },
  methods: {
    async fetchRestaurant (restaurantId) {
      try {
        // console.log('fetchRestaurant id: ', restaurantId)
        const { data } = await restaurantAPI.getRestaurant({ restaurantId })
        if (data.status === 'error') {
          throw new Error(data.message)
        }

        const { restaurant, isFavorited, isLiked } = data
        const {
          id,
          name,
          Category,
          image,
          opening_hours: openingHours,
          tel,
          address,
          description,
          Comments
        } = restaurant

        this.restaurant = {
          id,
          name,
          categoryName: Category ? Category.name : '未分類',
          image,
          openingHours,
          tel,
          address,
          description,
          isFavorited,
          isLiked,
        }

        this.restaurantComments = Comments
      } catch (error) {
        console.error(error.message)
        Toast.fire({
          icon: 'error',
          title: '無法取得餐廳資料，請稍後再試'
        })
      }
    },
    afterDeleteComment (commentId) {
      // console.log('afterDeleteComment', commentId)
      this.restaurantComments = this.restaurantComments.filter(
        comment => comment.id !== commentId
      )
    },
    afterCreateComment (payload) {
      // console.log('payload', payload)
      const { commentId, restaurantId, text } = payload
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name
        },
        text,
        createdAt: new Date()
      })
    }
  }
}
</script>