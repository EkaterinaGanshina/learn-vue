<template v-cloak>
    <form class="form">
        <div class="form-group">
            <label for="edit-surname">Фамилия</label>
            <input type="text" v-model.trim="user.surname" class="form-control" id="edit-surname">
        </div>
        <div class="form-group">
            <label for="edit-first-name">Имя</label>
            <input type="text" v-model.trim="user.firstName" class="form-control" id="edit-first-name">
        </div>
        <div class="form-group">
            <label for="edit-age">Возраст</label>
            <input type="text" v-model.trim.number="user.age" class="form-control" id="edit-age">
        </div>
        <button type="button" class="btn btn-primary">Сохранить</button>
    </form>
</template>

<script>
  export default {
    name: "AddUser",
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  };
</script>