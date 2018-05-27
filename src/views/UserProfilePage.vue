<template>
    <div class="col-xs-8 col-xs-offset-2">
        <div class="user-profile">
            <h1 class="text-center">Профиль пользователя</h1>

            <div v-if="!user" class="alert alert-warning">Загрузка...</div>
            <UserProfile v-else :user="user"/>

            <div class="buttons">
                <router-link :to="`/edit/${id}`" tag="button" class="btn btn-primary">
                    Редактировать
                </router-link>
                <router-link :to="`/users`" tag="button" class="btn btn-default">
                    К списку пользователей
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import axios from '@/axios.js'

export default {
  name: 'view-user-page',
  components: {
    UserProfile: () => import('@/components/UserProfile.vue')
  },
  data() {
    return {
      user: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  },
  mounted() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      axios
        .get(`/users/${this.id}`)
        .then(response => {
          this.user = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style>
.buttons {
  margin: 20px 0;
}
</style>
