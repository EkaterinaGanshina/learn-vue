<template>
    <div class="datepicker-wrapper">
        <input ref="datepicker" type="text" class="form-control" :value="value"/>
        <button @click="openPicker" type="button" class="btn btn-default">Выбрать</button>
    </div>
</template>

<script>
import flatpickr from 'flatpickr'
import { Russian } from 'flatpickr/dist/l10n/ru.js'
import 'flatpickr/dist/flatpickr.css'

export default {
  name: 'Datepicker',
  props: {
    value: {
      type: String,
      default: new Date()
    }
  },
  data() {
    return {
      fp: null
    }
  },
  watch: {
    value: 'updatePicker'
  },
  mounted() {
    this.initPicker()
  },
  beforeDestroy() {
    this.fp.destroy()
  },
  methods: {
    initPicker() {
      this.fp = flatpickr(this.$refs.datepicker, {
        dateFormat: 'd.m.Y',
        locale: Russian,
        maxDate: new Date(),
        onChange: (selectedDates, dateStr) => this.$emit('input', dateStr)
      })
    },

    updatePicker() {
      if (this.fp) {
        this.fp.setDate(this.value)
      }
    },

    openPicker() {
      if (this.fp) {
        this.fp.open()
      }
    }
  }
}
</script>

<style scoped>
.datepicker-wrapper {
  display: flex;
}

.datepicker-wrapper .btn {
  width: 100px;
  margin-left: 10px;
}
</style>
