<template>
    <ul class="pagination">
        <li v-for="page in pagesCount" :class="{ active: page === currentPage }">
            <a @click.prevent="switchPage" href="#">{{ page }}</a>
        </li>
    </ul>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      itemsCount: {
        type: Number,
        required: true
      },
      itemsPerPage: {
        type: Number,
        required: true
      }
    },
    model: {
      prop: 'startIndex',
      event: 'switchPage'
    },
    data: function () {
      return {
        currentPage: 1,
        startFrom: 0 // с какого элемента начинается текущая страница
      }
    },
    computed: {
      pagesCount() {
        return Math.ceil(this.itemsCount / this.itemsPerPage);
      }
    },
    watch: {
      currentPage() {
        this.startFrom = (this.currentPage - 1) * this.itemsPerPage;
        this.$emit('switchPage', this.startFrom);
      }
    },
    methods: {
      switchPage(event) {
        this.currentPage = parseInt(event.target.textContent);
      }
    }
  }
</script>