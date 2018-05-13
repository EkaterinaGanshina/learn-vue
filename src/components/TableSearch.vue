<template>
    <div class="col-xs-12 col-md-4">
        <div class="search input-group">
            <input v-model="query" type="text" class="form-control" placeholder="Поиск по таблице">
            <span class="input-group-btn">
            <button @click="sendSearchQuery" type="button" class="btn btn-primary">
                <span class="glyphicon glyphicon-search"></span>
            </button>
        </span>
        </div>
    </div>
</template>

<script>
export default {
  name: "TableSearch",
  model: {
    prop: "searchQuery",
    event: "search"
  },
  data() {
    return {
      query: ""
    };
  },
  watch: {
    query: "sendSearchQuery"
  },
  methods: {
    sendSearchQuery() {
      this.$emit("search", this.query.toLowerCase);
    }
  }
};
</script>
