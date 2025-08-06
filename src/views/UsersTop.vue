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
            @click.stop.prevent="deleteFollowing"
          >
            取消追蹤
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="addFollowing"
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
import usersAPI from './../apis/users'
import { Toast } from '../utils/helpers'

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
  created () {
    this.fetchTopUsers()
  },
  methods: {
    async fetchTopUsers () {
      try {
        const { data } = await usersAPI.getTopUsers()
        this.users = data.users.map(user => ({
          id: user.id,
          name: user.name,
          image: user.image,
          followCount: user.FollowCount,
          isFollowed: user.isFollowed
        }))
      } catch (error) {
        // console.log(error)
        Toast.fire({
          icon: 'error',
          title: '無法取得美食達人，請稍後再試'
        })
      }
    },
    async addFollowing (userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error (data.message)
        }
        this.users = this.users.map(user => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              followCount: user.followCount + 1,
              isFollowed: true
            }
          }
        })
      } catch (error) {
        Toast.fire ({
          icon: 'error',
          title: '無法加入追蹤，請稍後再試'
        })
      }
    },
    async deleteFollowing (userId) {
      try {
        const { data } = await usersAPI.addFollowing({ userId })
        if (data.status !== 'success') {
          throw new Error (data.message)
        }
        this.users = this.users.map(user => {
          if (user.id !== userId) {
            return user
          } else {
            return {
              ...user,
              followCount: user.followCount - 1,
              isFollowed: false
            }
          }
        })
      } catch (error) {
        Toast.fire ({
          icon: 'error',
          title: '無法取消追蹤，請稍後再試'
        })
      }
    }
  }
}
</script>