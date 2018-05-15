<template>
  <div class="col-xs-8 col-xs-offset-2">
    <div class="index">
      <h1 class="text-center">{{ title }}</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In vel lorem molestie, convallis lectus non, molestie mi. Fusce in enim nulla. Sed euismod dui odio, vel elementum turpis blandit suscipit. Pellentesque quis lorem eros. Sed ac varius magna, eget faucibus dolor. Phasellus dignissim efficitur erat eget rutrum. Nulla cursus justo a justo sollicitudin, consectetur porttitor lectus porta.</p>
    </div>

    <form class="form-inline">
      <div class="form-group">
        <label for="edit-title">Редактировать название страницы</label>
        <input v-model="title" type="text" class="form-control" id="edit-title">
      </div>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "IndexPage",
  computed: {
    title: {
      get() {
        return this.$store.state.indexPageTitle;
      },
      set(value) {
        this.$store.commit("changeIndexTitle", value);
      }
    }
  }
};
</script>

<style scoped>
form {
  margin-top: 40px;
}

input[type="text"] {
  margin-left: 10px;
}
</style>
