<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">
      美食達人
    </h1>
    <hr>
    <div class="row text-center">
      <div class="col-3">
        <a href="#">
          <img
            src="usersTop.image | emptyImage"
            width="140px"
            height="140px"
          >
        </a>
        <h2>{{ usersTop.name }}</h2>
        <span class="badge badge-secondary">追蹤人數：{{ usersTop.followers }}</span>
        <p class="mt-3">
          <button
            v-if="usersTop.isFollowing"
            type="button"
            class="btn btn-danger me-1"
            @click.stop.prevent="deleteFollow"
          >
            取消追蹤
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="addFollow"
          >
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from './../utils/mixins'

const dummyData = {
"usersTop": {
        "id": 1,
        "name": "Judy",
        "followers": "0",
        "image": "https://loremflickr.com/320/240/food,dessert,restaurant/?random=1",
        "createdAt": "2019-06-22T09:00:43.000Z",
        "updatedAt": "2019-06-22T09:00:43.000Z",
    },
    "isFollowing": false,
}

export default {
  mixins: [emptyImageFilter],
  data () {
    return {
      usersTop: {
        id: -1,
        name: '',
        followers: '',
        image: '',
        createdAt: '',
        updatedAt: '',
        isFollowing: false
      }
    }
  },
  mounted () {
    this.usersTop = {
      ...dummyData.usersTop,
      isFollowing: dummyData.isFollowing
    }
  },
  methods: {
    addFollow () {
      this.usersTop = {
        ...this.usersTop,
        isFollowing: true
      }
    },
    deleteFollow () {
      this.usersTop = {
        ...this.usersTop,
        isFollowing: false
      }
    }
  }
}
</script>