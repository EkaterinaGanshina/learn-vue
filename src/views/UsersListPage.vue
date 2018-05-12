<template>
    <div class="col-xs-12">
        <div class="users-list">
            <h1 class="text-center">Список пользователей</h1>

            <SmartTable :url="urlGetUsers"/>
        </div>
    </div>
</template>

<script>
export default {
  components: {
    SmartTable: () => import("@/components/SmartTable.vue")
  },
  data() {
    return {
      urlGetUsers: "/users"
    };
  }
};
</script>
