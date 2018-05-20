<template>
    <div class="profile-wrapper">
        <div class="row">
            <div class="col-xs-12 col-md-3">
                <img :src="user.picture" width="150" height="150" class="img-thumbnail">
            </div>
            <div class="col-xs-12 col-md-9">
                <p><strong>Пользователь:</strong> {{ fullName }}</p>
                <p><strong>Дата рождения:</strong> {{ user.birthday }}</p>
                <p><strong>E-mail:</strong> {{ user.email }}</p>
                <p><strong>Телефон:</strong> {{ user.phone }}</p>
                <p><strong>Зарегистрирован:</strong> {{ user.registered }}</p>
            </div>
        </div>

        <p><strong>Адрес:</strong> {{ user.address }}</p>
        <p><strong>Компания:</strong> {{ user.company }}</p>
        <p><strong>Баланс:</strong> ${{ user.balance }}</p>
        <p><strong>Роль:</strong> {{ userRole }}</p>
        <p><strong>Активен:</strong> {{ isActive }}</p>
        <div class="bio">
            <p><strong>Биография</strong></p>
            <div v-html="user.about"></div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'user-profile',
  props: {
    user: {
      type: Object,
      required: true
    },
    roles: {
      type: Object,
      default: () => {
        return {
          guest: 'Гость',
          user: 'Пользователь',
          admin: 'Администратор'
        }
      }
    }
  },
  computed: {
    fullName() {
      return `${this.user.firstName} ${this.user.lastName}`
    },

    userRole() {
      return this.roles[this.user.accessLevel]
    },

    isActive() {
      return this.user.isActive ? 'Да' : 'Нет'
    }
  }
}
</script>

<style scoped>
img {
  margin-bottom: 15px;
}

.bio {
  margin-top: 20px;
}
</style>
