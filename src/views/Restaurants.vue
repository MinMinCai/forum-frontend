<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
     <RestaurantsNavPills :categories="categories" />

    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
       <RestaurantCard 
       v-for="restaurant in restaurants" 
       :key="restaurant.id" 
       :initial-restaurant="restaurant"
       />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
     <RestaurantsPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from './../components/NavTabs'
import RestaurantCard from '../components/RestaurantCard.vue';
import RestaurantsNavPills from '../components/RestaurantsNavPills.vue';
import RestaurantsPagination from '../components/RestaurantsPagination.vue';

const dummyData = {
  restaurants: [
    {
      id: 10,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
    {
      id: 11,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
    {
      id: 12,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
    {
      id: 13,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
    {
      id: 14,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
        {
      id: 15,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
    {
      id: 16,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
    {
      id: 17,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
    {
      id: 18,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    },
    {
      id: 19,
      name: "testrestaurant",
      tel: "1-478-082-2904",
      adress: "oooo",
      opening_hours: "08:00",
      description: "uojhfwvfw keo -ihuycw",
      image: null,
      viewCounts: 55,
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z",
      categoryId: 100,
      Category: "複合式餐廳",
      idFavorited: true,
      isLiked: true
    }
  ],
  categories: [
    {
      id: 100,
      name: "複合式料理",
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z"
    },
    {
      id: 101,
      name: "美式料理",
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z"
    },
    {
      id: 102,
      name: "中式料理",
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z"
    },
    {
      id: 103,
      name: "韓式料理",
      createdAt: "2019-12-19T11:26:09.928Z",
      updatedAt: "2019-12-19T11:26:15.928Z"
    }
  ],
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2,
  categoryId: ''
}

export default {
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination
  },
  data () {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1
    }
  },
  created() {
    this.fetchRestaurants()
  },
  methods: {
    fetchRestaurants () {
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next
      } = dummyData
      this.restaurants = restaurants
      this.categories = categories
      this.categoryId = categoryId
      this.currentPage = page
      this.totalPage = totalPage
      this.previousPage = prev
      this.nextPage = next
    }
  }
}
</script>