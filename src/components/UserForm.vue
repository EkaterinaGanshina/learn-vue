<template>
    <form class="form">
        <div class="row">
            <div class="col-xs-4 col-md-3">
                <div class="form-group">
                    <label for="id-readonly">ID</label>
                    <input :value="localUser.id" type="text" class="form-control" id="id-readonly" readonly>
                </div>
            </div>
            <div class="col-xs-8 col-md-9">
                <div class="form-group">
                    <label for="registered-readonly">Зарегистрирован</label>
                    <input v-model.trim="localUser.registered" type="text" class="form-control" id="registered-readonly">
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="edit-first-name">Имя</label>
            <input v-model.trim="localUser.firstName" type="text" class="form-control" id="edit-first-name" required>
        </div>
        <div class="form-group">
            <label for="edit-surname">Фамилия</label>
            <input v-model.trim="localUser.lastName" type="text" class="form-control" id="edit-surname" required>
        </div>
        <div class="form-group">
            <label for="edit-age">Возраст</label>
            <input v-model.trim.number="localUser.age" type="text" class="form-control" id="edit-age">
        </div>
        <div class="form-group">
            <label for="edit-email">E-mail</label>
            <input v-model.trim="localUser.email" type="email" class="form-control" id="edit-email" required>
        </div>
        <div class="form-group">
            <label for="edit-phone">Телефон</label>
            <input v-model.trim="localUser.phone" type="text" class="form-control" id="edit-phone" required>
        </div>
        <div class="form-group">
            <label for="edit-address">Адрес</label>
            <input v-model.trim="localUser.address" type="text" class="form-control" id="edit-address" required>
        </div>
        <div class="form-group">
            <label for="edit-company">Компания</label>
            <input v-model.trim="localUser.company" type="text" class="form-control" id="edit-company">
        </div>
        <div class="form-group">
            <label for="edit-balance">Баланс</label>
            <input v-model.trim="localUser.balance" type="text" class="form-control" id="edit-balance">
        </div>
        <div class="form-group">
            <label for="edit-about">О пользователе</label>
            <textarea v-model="localUser.about" class="form-control" id="edit-about" rows="4"></textarea>
        </div>
    </form>
</template>

<script>
  export default {
    name: "UserForm",
    model: {
      prop: 'user'
    },
    props: {
      user: {
        type: Object,
        required: true
      }
    },
    data: () => ({
        localUser: null
      }
    ),
    watch: {
      localUser: {
        deep: true,
        handler() {
          this.$emit('input', this.localUser);
        }
      }
    },
    created() {
      this.localUser = Object.assign({}, this.user)
    }
  };
</script>