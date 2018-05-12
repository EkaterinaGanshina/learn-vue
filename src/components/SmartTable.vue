<template>
    <div class="smart-table">
        <div v-if="!list.length" class="alert alert-warning">Загрузка...</div>
        <template v-else>
            <div class="table-header">
                <div class="str-count">Всего {{ total }} {{ declension }}</div>
                <TableSearch v-model="searchQuery"/>
            </div>

            <table class="table table-striped users">
                <thead>
                <tr>
                    <slot name="table-header">
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Фамилия</th>
                        <th>День рождения</th>
                        <th>E-mail</th>
                        <th>Телефон</th>
                        <th>Компания</th>
                        <th>Действия</th>
                    </slot>
                </tr>
                </thead>
                <tbody>
                <tr v-if="this.searchQuery.length && this.searchResults.length === 0">
                    <td colspan="8">Ничего не найдено</td>
                </tr>
                <tr v-else v-for="user in filteredList" :key="user.id" class="user">
                    <slot name="table-row" v-bind="user">
                        <td>{{ user.id }}</td>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.birthday }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.company }}</td>
                        <td>
                            <router-link :to="`/edit/${user.id}`" tag="button"
                                         class="btn btn-default btn-sm"
                                         title="Редактировать">
                                <span class="glyphicon glyphicon-pencil"></span>
                            </router-link>
                        </td>
                    </slot>
                </tr>
                </tbody>
            </table>

            <Pagination :pagesCount="pagesCount" :itemsPerPage="itemsPerPage" v-model="currentPage"/>
            <ItemsPerPageSelect v-model="itemsPerPage"/>
        </template>
    </div>
</template>

<script>
import axios from "@/axios.js";
import proschet from "proschet";

export default {
  name: "smart-table",
  components: {
    TableSearch: () => import("@/components/TableSearch.vue"),
    Pagination: () => import("@/components/Pagination.vue"),
    ItemsPerPageSelect: () => import("@/components/ItemsPerPageSelect.vue")
  },
  props: {
    url: {
      type: String,
      required: true
    }
  },
  data: function() {
    return {
      list: [],
      total: 0,
      searchTotal: 0,
      userDeclensions: ["пользователь", "пользователя", "пользователей"],
      searchQuery: "",
      searchResults: [],
      itemsPerPage: 10,
      currentPage: 1
    };
  },
  computed: {
    declension() {
      const getUsers = proschet(this.userDeclensions);
      return getUsers(this.total);
    },

    pagesCount() {
      const itemsCount = this.searchQuery.length
        ? this.searchTotal
        : this.total;
      return Math.ceil(itemsCount / this.itemsPerPage);
    },

    filteredList() {
      return this.searchQuery.length ? this.searchResults : this.list;
    }
  },
  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },

    // переключение страницы (пагинация)
    currentPage() {
      this.searchQuery.length ? this.search() : this.loadItems();
    },

    // изменение поискового запроса (поиск)
    searchQuery() {
      this.currentPage = 1;
      this.searchQuery.length ? this.search() : this.loadItems();
    }
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      axios
        .get(
          `${this.url}?_page=${this.currentPage}&_limit=${this.itemsPerPage}`
        )
        .then(response => {
          this.list = response.data;
          this.total = response.headers["x-total-count"];
        })
        .catch(error => {
          console.error(error);
        });
    },

    search() {
      axios
        .get(
          `${this.url}?q=${this.searchQuery}&_page=${this.currentPage}&_limit=${
            this.itemsPerPage
          }`
        )
        .then(response => {
          this.searchResults = response.data;
          this.searchTotal = response.headers["x-total-count"];
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style scoped>
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
