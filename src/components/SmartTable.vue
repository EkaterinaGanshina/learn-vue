<template>
    <div class="smart-table">
        <UsersList :users="filteredList"/>
        <Pagination :itemsCount="list.length" :itemsPerPage="itemsPerPage" v-model="currentPage"/>
        <ItemsPerPageSelect v-model="itemsPerPage"/>
    </div>
</template>

<script>
  import axios from 'axios';

  export default {
    components: {
      'UsersList': () => import('@/components/UsersList.vue'),
      'Pagination': () => import('@/components/Pagination.vue'),
      'ItemsPerPageSelect': () => import('@/components/ItemsPerPageSelect.vue')
    },
    data: function () {
      return {
        list: [],
        filteredList: [],
        itemsPerPage: 10,
        currentPage: 1
      }
    },
    computed: {
      startIndex() {
        return (this.currentPage - 1) * this.itemsPerPage;
      },
      endIndex() {
        return this.startIndex + this.itemsPerPage - 1;
      }
    },
    watch: {
      itemsPerPage() {
        this.currentPage = 1;
        this.filterItems();
      },
      currentPage: 'filterItems'
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
            this.$emit('loadingOver');
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