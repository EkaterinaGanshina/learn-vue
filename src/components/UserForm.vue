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
                    <label>Зарегистрирован</label>
                    <input :value="localUser.registered" class="form-control" id="edit-readonly" readonly/>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12 col-md-3">
                <div class="form-group">
                    <label for="edit-pic">Аватарка</label>
                    <UploadAvatar v-model="localUser.picture" id="edit-pic"/>
                </div>
            </div>
            <div class="col-xs-12 col-md-9">
                <div :class="[{ 'has-error': errors.has('firstName') }, 'form-group']">
                    <label for="edit-firstname">Имя</label>
                    <input v-model.trim="localUser.firstName"
                           v-validate="'required|alpha_dash'"
                           type="text" class="form-control"
                           id="edit-firstname" name="firstName">
                    <span v-show="errors.has('firstName')" class="control-label">{{ errors.first('firstName') }}</span>
                </div>
                <div class="form-group">
                    <label for="edit-lastname">Фамилия</label>
                    <input v-model.trim="localUser.lastName"
                           v-validate="'required|alpha_dash'"
                           type="text" class="form-control"
                           id="edit-lastname" name="lasName">
                    <span v-show="errors.has('lastName')" class="control-label">{{ errors.first('firstName') }}</span>
                </div>
                <div class="form-group">
                    <label for="edit-birthday">Дата рождения</label>
                    <Datepicker v-model="localUser.birthday" id="edit-birthday"/>
                </div>
            </div>
        </div>

        <div class="form-group">
            <label for="edit-email">E-mail</label>
            <input v-model.trim="localUser.email"
                   v-validate="'required|email'"
                   type="email" class="form-control"
                   placeholder="example@mail.ru"
                   id="edit-email" name="email" required>
        </div>
        <div class="form-group">
            <label for="edit-phone">Телефон</label>
            <input v-model.trim="localUser.phone"
                   type="text" class="form-control"
                   placeholder="8 (912) 345-67-89"
                   id="edit-phone">
        </div>
        <div class="form-group">
            <label for="edit-address">Адрес</label>
            <input v-model.trim="localUser.address"
                   type="text" class="form-control"
                   id="edit-address">
        </div>
        <div class="form-group">
            <label for="edit-company">Компания</label>
            <input v-model.trim="localUser.company" type="text" class="form-control" id="edit-company">
        </div>

        <div class="form-group">
            <div class="form-inline">
                <label for="edit-balance">Баланс</label>
                <div class="input-group">
                    <div class="input-group-addon">$</div>
                    <input v-model.number="localUser.balance" type="text" class="form-control" id="edit-balance">
                </div>
            </div>
        </div>

        <div class="form-group">
            <AccessLevel v-model="user.accessLevel" :roles="roles">Роль</AccessLevel>
        </div>

        <div class="form-group">
            <SimpleCheckbox v-model="localUser.isActive">
                Пользователь активен
            </SimpleCheckbox>
        </div>

        <div class="form-group-inline">
            <label for="edit-about">Биография</label>
            <vue-editor v-model="localUser.about" id="edit-about" :editorToolbar="customToolbar"></vue-editor>
        </div>
    </form>
</template>

<script>
import Vue from 'vue'
import VeeValidate from 'vee-validate'
import { VueEditor } from 'vue2-editor'
import config from '@/config.js'

Vue.use(VeeValidate)

export default {
  name: 'UserForm',
  inject: ['$validator'],
  model: {
    prop: 'user'
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    Datepicker: () => import('@/components/Datepicker.vue'),
    UploadAvatar: () => import('@/components/UploadAvatar.vue'),
    SimpleCheckbox: () => import('@/components/SimpleCheckbox.vue'),
    AccessLevel: () => import('@/components/AccessLevelSelect.vue'),
    VueEditor
  },
  data() {
    return {
      localUser: null,
      customToolbar: [
        ['bold', 'italic', 'underline', 'strike'],
        [
          { align: '' },
          { align: 'center' },
          { align: 'right' },
          { align: 'justify' }
        ],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['blockquote', 'code-block'],
        ['color', 'background']
      ]
    }
  },
  computed: {
    roles() {
      return config.roles
    }
  },
  watch: {
    localUser: {
      deep: true,
      handler() {
        this.$emit('input', this.localUser)
      }
    }
  },
  created() {
    this.localUser = Object.assign({}, this.user)
  }
}
</script>

<style scoped>
form {
  margin-bottom: 15px;
}

.form-inline label {
  margin-right: 10px;
}

.form-inline .input-group + label {
  margin-left: 15px;
}
</style>
