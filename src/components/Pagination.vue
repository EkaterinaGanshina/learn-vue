<template>
    <ul class="pagination">
        <li :class="{ disabled: isBtnDisabled(1) }">
            <a @click.prevent="switchPage(1)" href="#">first</a>
        </li>

        <li :class="{ disabled: isBtnDisabled(1) }">
            <a @click.prevent="decrementPage()" href="#">prev</a>
        </li>

        <li v-for="page in pagesCount" :class="{ active: page === currentPage }" :key="page">
            <a @click.prevent="switchPage(page)" href="#">{{ page }}</a>
        </li>

        <li :class="{ disabled: isBtnDisabled(pagesCount) }">
            <a @click.prevent="incrementPage()" href="#">next</a>
        </li>

        <li :class="{ disabled: isBtnDisabled(pagesCount) }">
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
  methods: {
    switchPage(page) {
      this.$emit("switchPage", page);
    },

    decrementPage() {
      // если уже находимся на первой странице
      if (this.currentPage === 1) return;
      this.$emit("switchPage", this.currentPage - 1);
    },

    incrementPage() {
      // если уже находимся на последней странице
      if (this.currentPage === this.pagesCount) return;
      this.$emit("switchPage", this.currentPage + 1);
    },

    isBtnDisabled(pageNumber) {
      return this.currentPage === pageNumber || this.pagesCount === 0;
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
