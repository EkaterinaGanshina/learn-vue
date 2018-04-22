<template>
    <div class="col-xs-8 col-xs-offset-2">
        <div class="edit">
            <h1 class="text-center">Редактировать пользователя</h1>

            <div v-if="!user" class="alert alert-warning">Загрузка...</div>
            <UserForm v-else v-model="user"/>

            <button @click="saveUser" type="button" class="btn btn-primary">Сохранить</button>
            <button @click="deleteUser" type="button" class="btn btn-danger pull-right">Удалить пользователя</button>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: "edit",
    components: {
      'UserForm': () => import('@/components/UserForm.vue')
    },
    data () {
      return {
        user: null
      }
    },
    computed: {
      id() {
        return this.$route.params.id
      },

      loadUrl() {
        return `http://localhost:3004/users/${this.id}`
      }
    },
    methods: {
      loadUser() {
        axios.get(this.loadUrl)
          .then((response) => {
            this.user = response.data;
          })
      },

      saveUser() {
        axios.patch(this.loadUrl, this.user)
          .then(() => {
            console.info('Данные сохранены.');
            this.redirectToList();
          })
          .catch((error) => {
            console.error(error)
          })
      },

      deleteUser() {
        axios.delete(this.loadUrl)
          .then(() => {
            console.info('Пользователь удален.');
            this.redirectToList();
          })
          .catch((error) => {
            console.error(error)
          })
      },

      redirectToList() {
        this.$router.push('/users');
      }
    },
    mounted() {
      this.loadUser();
    }
  };
</script>