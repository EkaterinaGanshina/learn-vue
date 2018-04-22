<template>
    <div class="col-xs-12">
        <div class="users-list">
            <h1 class="text-center">Список пользователей</h1>

            <div v-if="!list.length" class="alert alert-warning">Загрузка...</div>
            <UsersList v-else :users="list"/>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import UsersList from "@/components/UsersList.vue";

  export default {
    name: "users-list",
    components: {
      UsersList
    },
    data: function () {
      return {
        list: []
      }
    },
    mounted() {
      this.loadUsers()
    },
    methods: {
      loadUsers() {
        axios.get('http://localhost:3004/users')
          .then((response) => {
            this.list = response.data;
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }
</script>