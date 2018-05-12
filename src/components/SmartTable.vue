<template>
    <div class="smart-table">
        <div v-if="!list.length" class="alert alert-warning">Загрузка...</div>
        <template v-else>
            <div class="table-header">
                <div class="str-count">Всего {{ list.length }} {{ declension }}</div>
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
                <tr v-for="user in filteredList" :key="user.id" class="user">
                    <slot name="table-row" v-bind="user">
                        <td>{{ user.id }}</td>
                        <td>{{ user.firstName }}</td>
                        <td>{{ user.lastName }}</td>
                        <td>{{ user.birthday }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phone }}</td>
                        <td>{{ user.company }}</td>
                        <td>
                            <router-link :to="`/edit/${user.id}`" tag="button" class="btn btn-default btn-sm"
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
      return getUsers(this.list.length);
    },

    startIndex() {
      return (this.currentPage - 1) * this.itemsPerPage;
    },

    endIndex() {
      return this.startIndex + this.itemsPerPage;
    },

    pagesCount() {
      let itemsCount = this.searchResults.length
        ? this.searchResults.length
        : this.list.length;
      return Math.ceil(itemsCount / this.itemsPerPage);
    },

    filteredList() {
      let data = this.searchResults.length ? this.searchResults : this.list;
      return data.slice(this.startIndex, this.endIndex);
    }
  },
  watch: {
    itemsPerPage() {
      this.currentPage = 1;
    },

    searchQuery: "search"
  },
  mounted() {
    this.loadItems();
  },
  methods: {
    loadItems() {
      axios
        .get(this.url)
        .then(response => {
          this.list = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },

    search() {
      this.searchResults = this.list.filter(item => {
        for (let key in item) {
          if (
            item[key]
              .toString()
              .toLowerCase()
              .includes(this.searchQuery)
          ) {
            return true;
          }
        }

        return false;
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
