<template>
  <div class="col-xs-8 col-xs-offset-2">
    <div class="add">
      <h1>Добавить пользователя</h1>

      <AddUser :user="currentUser"/>
    </div>
  </div>
</template>

<script>
  import AddUser from "@/components/AddUser.vue";

  export default {
    name: "Add",
    components: {
      AddUser
    },
    data: function () {
      return {
        currentUser: {
          id: 1,
          firstName: 'Иван',
          surname: 'Иванов',
          age: '25'
        }
      }
    }
  };
</script>