<template>
    <div class="col-xs-12">
        <div class="users-list">
            <h1 class="text-center">Список пользователей</h1>

            <div v-show="loading" class="alert alert-warning">Загрузка...</div>
            <SmartTable v-show="!loading" @loadingOver="hideAlert"/>
        </div>
    </div>
</template>

<script>
  import SmartTable from '@/components/SmartTable.vue';

  export default {
    components: {
      SmartTable
    },
    data() {
      return {
        loading: true
      }
    },
    methods: {
      hideAlert() {
        this.loading = false;
      }
    }
  }
</script>