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
      },
      currentPage: {
        type: Number,
        required: true
      }
    },
    model: {
      prop: 'currentPage',
      event: 'switchPage'
    },
    data() {
      return {
        localPage: 1
      }
    },
    computed: {
      pagesCount() {
        return Math.ceil(this.itemsCount / this.itemsPerPage);
      }
    },
    watch: {
      localPage() {
        this.$emit('switchPage', this.localPage);
      }
    },
    methods: {
      switchPage(event) {
        this.localPage = parseInt(event.target.textContent);
      }
    },
    created() {
      this.localPage = this.currentPage;
    }
  }
</script>