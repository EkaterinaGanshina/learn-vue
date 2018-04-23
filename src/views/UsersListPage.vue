<template>
    <div class="col-xs-12">
        <div class="users-list">
            <h1 class="text-center">Список пользователей</h1>

            <SmartTable :list="usersList"/>
        </div>
    </div>
</template>

<script>
  import axios from '@/axios.js';

  export default {
    components: {
      'SmartTable': () => import('@/components/SmartTable.vue')
    },
    data() {
      return {
        usersList: []
      }
    },
    mounted() {
      this.loadUsers();
    },
    methods: {
      loadUsers() {
        axios.get('/users')
          .then(response => {
            this.usersList = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      }
    }
  }
</script>