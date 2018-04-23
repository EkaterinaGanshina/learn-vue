<template>
  <div class="col-xs-8 col-xs-offset-2">
    <div class="add">
      <h1 class="text-center">Добавить пользователя</h1>

      <UserForm v-model="user"/>
      <button @click="createUser" type="button" class="btn btn-primary">Добавить пользователя</button>
      <button @click="cancelCreate" type="button" class="btn btn-default pull-right">Отмена</button>
    </div>
  </div>
</template>

<script>
  import axios from '@/axios.js';

  export default {
    name: "add-users-page",
    components: {
      'UserForm': () => import('@/components/UserForm.vue')
    },
    data: function () {
      return {
        user: null
      }
    },
    methods: {
      redirectToList() {
        this.$router.push('/users');
      },

      createUser() {
        const now = new Date();
        this.user.registered = now.toLocaleDateString();

        axios.post('/users', this.user)
          .then(() => {
            console.info('Пользователь создан');
            this.redirectToList();
          })
          .catch((error) => {
            console.error(error)
          })
      },

      cancelCreate() {
        this.redirectToList();
      }
    }
  };
</script>