<template>
    <div class="col-xs-12">
        <div class="users-list">
            <h1 class="text-center">Список пользователей</h1>

            <div v-if="!list.length" class="alert alert-warning">Загрузка...</div>
            <UsersList v-else :users="filteredList"/>
            <Pagination :itemsCount="list.length" :itemsPerPage="itemsOnPage" v-model="startIndex"/>
        </div>
    </div>
</template>

<script>
  import axios from 'axios';
  import UsersList from '@/components/UsersList.vue';
  import Pagination from '@/components/Pagination.vue';

  export default {
    components: {
      UsersList,
      Pagination
    },
    data: function () {
      return {
        list: [],
        filteredList: [],
        itemsOnPage: 10,
        startIndex: 0
      }
    },
    computed: {
      endIndex() {
        return this.startIndex + this.itemsOnPage - 1;
      }
    },
    watch: {
      startIndex: 'filterItems'
    },
    mounted() {
      this.loadUsers();
    },
    methods: {
      loadUsers() {
        axios.get('http://localhost:3004/users')
          .then((response) => {
            this.list = response.data;
            this.filterItems();
          })
          .catch((error) => {
            console.error(error);
          });
      },

      filterItems() {
        this.filteredList = this.list.filter((item) =>
          this.list.indexOf(item) >= this.startIndex && this.list.indexOf(item) <= this.endIndex);
      }
    },
  }
</script>