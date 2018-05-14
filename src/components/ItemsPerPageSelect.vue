<template>
    <div class="items-count">
        <span>Элементов на странице: </span>
        <select :value="itemsPerPage" @change="selectNewValue" class="form-control">
            <option v-for="(option, index) in options" :value="option" :key="index">{{ option }}</option>
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
      default: () => [5, 10, 20]
    }
  },
  methods: {
    selectNewValue() {
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
