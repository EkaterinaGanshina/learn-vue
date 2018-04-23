<template>
    <ul class="pagination">
        <li :class="{ disabled: prevDisabled }">
            <a @click.prevent="decrementPage" data-btn="first" href="#">first</a>
        </li>

        <li :class="{ disabled: prevDisabled }">
            <a @click.prevent="decrementPage" data-btn="decrement" href="#">prev</a>
        </li>

        <li v-for="page in pagesCount" :class="{ active: page === currentPage }" :key="page">
            <a @click.prevent="switchPage" href="#">{{ page }}</a>
        </li>

        <li :class="{ disabled: nextDisabled }">
            <a @click.prevent="incrementPage" data-btn="increment" href="#">next</a>
        </li>

        <li :class="{ disabled: nextDisabled }">
            <a @click.prevent="incrementPage" data-btn="last" href="#">last</a>
        </li>
    </ul>
</template>

<script>
  export default {
    name: 'Pagination',
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
      prop: 'currentPage',
      event: 'switchPage'
    },
    data() {
      return {
        localPage: 1,
        prevDisabled: true,
        nextDisabled: false,

      }
    },
    watch: {
      localPage() {
        this.$emit('switchPage', this.localPage);
      }
    },
    created() {
      this.localPage = this.currentPage;
    },
    methods: {
      switchPage(event) {
        this.localPage = parseInt(event.target.textContent);
        if (this.localPage === 1) {
          this.prevDisabled = true;
          this.nextDisabled = false;
        } else if (this.localPage === this.pagesCount) {
          this.prevDisabled = false;
          this.nextDisabled = true;
        } else {
          this.prevDisabled = false;
          this.nextDisabled = false;
        }
      },

      decrementPage(event) {
        // если уже находимся на первой странице
        if (this.localPage === 1) return false;

        // проверяем, какая кнопка нажата - "первая страница" или "предыдущая страница"
        if (event.target.dataset.btn === 'first') {
          this.localPage = 1;
        } else {
          this.localPage--;
        }

        this.nextDisabled = false;
        if (this.localPage === 1) {
          this.prevDisabled = true;
        }
      },

      incrementPage(event) {
        // если уже находимся на последней странице
        if (this.localPage === this.pagesCount) return false;

        // проверяем, какая кнопка нажата - "последняя страница" или "следующая страница"
        if (event.target.dataset.btn === 'last') {
          this.localPage = this.pagesCount;
        } else {
          this.localPage++;
        }

        this.prevDisabled = false;
        if (this.localPage === this.pagesCount) {
          this.nextDisabled = true;
        }
      }
    }
  }
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