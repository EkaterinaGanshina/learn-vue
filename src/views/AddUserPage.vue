<template>
  <div class="col-xs-8 col-xs-offset-2">
    <div class="edit-user">
      <h1 class="text-center">Добавить пользователя</h1>

      <UserForm v-model="user"/>
      <button @click="createUser" type="button" class="btn btn-primary">Добавить пользователя</button>
      <button @click="cancelCreate" type="button" class="btn btn-default pull-right">Отмена</button>
    </div>
  </div>
</template>

<script>
import axios from "@/axios.js";
import UserForm from "@/components/UserForm.vue";

export default {
  name: "add-users-page",
  components: {
    UserForm
  },
  data: function() {
    return {
      // заготовка для нового пользователя
      user: {
        isActive: true,
        balance: "",
        picture: "http://placehold.it/128x128",
        birthday: "",
        accessLevel: "user",
        firstName: "",
        lastName: "",
        company: "",
        email: "",
        phone: "",
        address: "",
        about: ""
      }
    };
  },
  methods: {
    createUser() {
      this.$validator.validateAll();
      if (this.errors.any()) {
        alert("Что-то пошло не так. Проверьте, правильно ли заполнены поля");
        return;
      }

      const now = new Date();
      this.user.registered = now.toLocaleDateString();

      axios
        .post("/users", this.user)
        .then(response => {
          console.info("Пользователь создан");
          this.$router.push("/edit/" + response.data.id);
        })
        .catch(error => {
          console.error(error);
        });
    },

    cancelCreate() {
      this.$router.push("/users");
    }
  }
};
</script>
