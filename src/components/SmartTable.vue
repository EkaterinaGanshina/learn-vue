<template>
    <div class="smart-table">
        <div class="table-header">
            <div class="str-count">Всего {{ list.length }} {{ getDeclension() }}</div>
            <TableSearch :users="list" @search="showSearchResults"/>
        </div>
        <UsersList :users="filteredList"/>
        <Pagination :pagesCount="pagesCount" :itemsPerPage="itemsPerPage" v-model="currentPage"/>
        <ItemsPerPageSelect v-model="itemsPerPage"/>
    </div>
</template>

<script>
  import axios from 'axios';
  import proschet from 'proschet';

  export default {
    components: {
      'UsersList': () => import('@/components/UsersList.vue'),
      'TableSearch': () => import('@/components/TableSearch.vue'),
      'Pagination': () => import('@/components/Pagination.vue'),
      'ItemsPerPageSelect': () => import('@/components/ItemsPerPageSelect.vue'),
    },
    data: function () {
      return {
        userDeclensions: ['пользователь', 'пользователя', 'пользователей'],
        list: [],
        filteredList: [],
        searchResults: [],
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
      },
      pagesCount() {
        let itemsCount = this.searchResults.length ? this.searchResults.length : this.list.length;
        return Math.ceil(itemsCount / this.itemsPerPage);
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
      getDeclension() {
        const getUsers = proschet(this.userDeclensions);
        return getUsers(this.list.length);
      },

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
        let dataSource = this.searchResults.length ? this.searchResults : this.list;
        this.filteredList = dataSource.filter((item) =>
          dataSource.indexOf(item) >= this.startIndex && dataSource.indexOf(item) <= this.endIndex);
      },

      showSearchResults(searchResults) {
        this.searchResults = searchResults;
        this.filterItems();
      }
    },
  }
</script>

<style>
    .table-header {
        margin: 20px 0;
        padding: 0 5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .table-header .str-count {
        font-weight: 700;
        font-size: 14px;
    }
</style>