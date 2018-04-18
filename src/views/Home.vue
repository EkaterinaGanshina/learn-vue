<template>
  <div class="col-xs-8 col-xs-offset-2">
    <div class="home">
      <h3>Список пользователей</h3>

      <UsersList :users="list"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import UsersList from "@/components/UsersList.vue";

export default {
  name: "home",
  components: {
    UsersList
  },
  data: function () {
    return {
      list: []
    }
  },
  mounted() {
    const xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        this.list = xhr.response;
      }
    };
    xhr.open('GET', 'http://localhost:3004/users');
    xhr.send();
  }
};
</script>
