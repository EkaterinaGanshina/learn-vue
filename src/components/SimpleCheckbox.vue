<template>
    <label class="checkbox-inline">
        <span class="text"><slot></slot></span>
        <input :checked="isChecked" @change="toggle()" type="checkbox" class="element"/>
        <span class="cbx"></span>
    </label>
</template>

<script>
export default {
  name: 'SimpleCheckbox',
  props: {
    isChecked: {
      type: Boolean,
      default: false
    }
  },
  model: {
    prop: 'isChecked'
  },
  methods: {
    toggle() {
      this.$emit('input', !this.isChecked)
    }
  }
}
</script>

<style scoped>
.checkbox-inline {
  padding: 0;
}

.text {
  vertical-align: middle;
  font-weight: 700;
}

.element {
  position: absolute;
  left: -9999px;
  opacity: 0;
}

.element + .cbx {
  width: 22px;
  height: 22px;
  background-color: #fff;
  border: 1px solid #ccc;
  display: inline-block;
  vertical-align: middle;
  margin: 0 8px;
  border-radius: 4px;
  color: #555;
  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  -webkit-transition: border-color ease-in-out 0.15s,
    -webkit-box-shadow ease-in-out 0.15s;
  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}

.element:checked + .cbx::after {
  content: '✔';
  display: inline-block;
  width: 100%;
  text-align: center;
  font-size: 14px;
}
</style>
