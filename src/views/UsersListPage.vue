<template>
    <div class="col-xs-12">
        <div class="users-list">
            <h1 class="text-center">{{ title }}</h1>

            <SmartTable :url="urlGetUsers"></SmartTable>
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
  },
  computed: {
    title() {
      return this.$store.state.usersPageTitle;
    }
  }
};
</script>
