<template>
    <div class="items-count">
        <span>Элементов на странице: </span>
        <select @change="setItemsCount" class="form-control">
            <option value="5">5</option>
            <option value="10" selected>10</option>
            <option value="20">20</option>
        </select>
    </div>
</template>

<script>
  export default {
    name: 'ItemsPerPageSelect',
    model: {
      prop: 'itemsPerPage',
      event: 'switchItemsNumber'
    },
    props: {
      itemsPerPage: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        localItemsNumber: 10
      }
    },
    watch: {
      localItemsNumber() {
        this.$emit('switchItemsNumber', this.localItemsNumber)
      }
    },
    methods: {
      setItemsCount(event) {
        this.localItemsNumber = parseInt(event.target.value);
      }
    },
    created() {
      this.localItemsNumber = this.itemsPerPage;
    }
  }
</script>

<style>
    .items-count,
    .items-count span,
    .items-count select {
        display: inline-block;
        vertical-align: middle;
    }

    .items-count select {
        width: 200px;
        margin-left: 10px
    }
</style>