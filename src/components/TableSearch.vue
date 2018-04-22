<template>
    <div class="col-xs-12 col-md-4">
        <div class="search input-group">
            <input v-model="query" @keyup="search" type="text" class="form-control"
                   placeholder="Поиск по таблице">
            <span class="input-group-btn">
            <button @click="search" type="button" class="btn btn-primary">
                <span class="glyphicon glyphicon-search"></span>
            </button>
        </span>
        </div>
    </div>
</template>

<script>
  export default {
    name: 'TableSearch',
    props: {
      users: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        searchResults: [],
        query: ''
      }
    },
    watch: {
      query() {
        if (this.query.length) {
          this.query = this.query.toLowerCase();
          this.search();
        } else {
          this.searchResults = [];
        }
      },
      searchResults() {
        this.$emit('search', this.searchResults);
      }
    },
    methods: {
      search() {
        this.searchResults = this.users.filter(item => {
          for (let key in item) {
            if (item[key].toString().toLowerCase().indexOf(this.query) > -1) {
              return true;
            }
          }

          return false;
        });
      }
    }
  }
</script>