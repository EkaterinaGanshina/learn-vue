<template>
    <div class="col-xs-8 col-xs-offset-2">
        <div class="edit-user">
            <h1 class="text-center">Редактировать пользователя</h1>

            <div v-if="!user" class="alert alert-warning">Загрузка...</div>
            <UserForm v-else v-model="user"/>

            <button @click="saveUser" type="button" class="btn btn-primary">Сохранить</button>
            <router-link :to="`/users`" tag="button" class="btn btn-default">
                Отмена
            </router-link>
            <button @click="deleteUser" type="button" class="btn btn-danger pull-right">Удалить пользователя</button>
        </div>
    </div>
</template>

<script>
import axios from '@/axios.js'
import UserForm from '@/components/UserForm.vue'

export default {
  name: 'edit-user-page',
  components: {
    UserForm
  },
  data() {
    return {
      user: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    },

    loadUrl() {
      return `/users/${this.id}`
    }
  },
  mounted() {
    this.loadUser()
  },
  methods: {
    loadUser() {
      axios.get(this.loadUrl).then(response => {
        this.user = response.data
      })
    },

    saveUser() {
      this.$validator.validateAll()
      if (this.errors.any()) {
        alert('Что-то пошло не так. Проверьте, правильно ли заполнены поля')
        return
      }

      axios
        .patch(this.loadUrl, this.user)
        .then(() => {
          console.info('Данные сохранены.')
          this.$router.push(`/view/${this.id}`)
        })
        .catch(error => {
          console.error(error)
        })
    },

    deleteUser() {
      axios
        .delete(this.loadUrl)
        .then(() => {
          console.info('Пользователь удален.')
          this.$router.push('/users')
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>
