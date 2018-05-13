<template>
    <div class="items-count">
        <span>Элементов на странице: </span>
        <select v-model="itemsPerPage" class="form-control">
            <option v-for="option in options" :value="option.value" :key="option.id">{{ option.value }}</option>
        </select>
    </div>
</template>

<script>
export default {
  name: "ItemsPerPageSelect",
  model: {
    prop: "itemsPerPage",
    event: "switchItemsNumber"
  },
  props: {
    itemsPerPage: {
      type: Number,
      required: true
    },
    options: {
      type: Array,
      default: () => [
        {
          id: 0,
          value: 5
        },
        {
          id: 1,
          value: 10
        },
        {
          id: 2,
          value: 20
        }
      ]
    }
  },
  watch: {
    itemsPerPage() {
      this.$emit("switchItemsNumber", this.itemsPerPage);
    }
  }
};
</script>

<style scoped>
.items-count,
.items-count span,
.items-count select {
  display: inline-block;
  vertical-align: middle;
}

.items-count select {
  width: 200px;
  margin-left: 10px;
}
</style>
