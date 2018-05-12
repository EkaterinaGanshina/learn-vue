<template>
    <ul class="pagination">
        <li :class="{ disabled: localPage === 1 || pagesCount === 0 }">
            <a @click.prevent="switchPage(1)" href="#">first</a>
        </li>

        <li :class="{ disabled: localPage === 1 || pagesCount === 0 }">
            <a @click.prevent="decrementPage()" href="#">prev</a>
        </li>

        <li v-for="page in pagesCount" :class="{ active: page === currentPage }" :key="page">
            <a @click.prevent="switchPage(page)" href="#">{{ page }}</a>
        </li>

        <li :class="{ disabled: localPage === pagesCount || pagesCount === 0 }">
            <a @click.prevent="incrementPage()" href="#">next</a>
        </li>

        <li :class="{ disabled: localPage === pagesCount || pagesCount === 0 }">
            <a @click.prevent="switchPage(pagesCount)" href="#">last</a>
        </li>
    </ul>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    pagesCount: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  model: {
    prop: "currentPage",
    event: "switchPage"
  },
  data() {
    return {
      localPage: 1
    };
  },
  watch: {
    localPage() {
      this.$emit("switchPage", this.localPage);
    }
  },
  created() {
    this.localPage = this.currentPage;
  },
  methods: {
    switchPage(page) {
      this.localPage = page;
    },

    decrementPage() {
      // если уже находимся на первой странице
      if (this.localPage === 1) return false;
      this.localPage--;
    },

    incrementPage() {
      // если уже находимся на последней странице
      if (this.localPage === this.pagesCount) return false;
      this.localPage++;
    }
  }
};
</script>

<style scoped>
.pagination {
  vertical-align: middle;
  margin-right: 20px;
}

.pagination .disabled a {
  cursor: default;
}
</style>
