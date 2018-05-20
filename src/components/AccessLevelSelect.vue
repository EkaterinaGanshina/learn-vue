<template>
    <div class="form-inline select-wrapper">
        <div class="form-group">
            <label for="access-level"><slot></slot></label>
            <select :value="accessLevel" @change="selectRole" id="access-level" class="form-control">
                <option v-for="(role, key, index) in roles" :value="key" :key="index">{{ role }}</option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
  name: 'access-level-select',
  props: {
    roles: {
      type: Object,
      required: true
    },
    accessLevel: {
      type: String,
      required: true
    }
  },
  model: {
    prop: 'accessLevel'
  },
  methods: {
    selectRole($event) {
      this.$emit('input', $event.target.value)
    }
  }
}
</script>

<style scoped>
.select-wrapper label {
  margin-right: 10px;
}
</style>
