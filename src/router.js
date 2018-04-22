import Vue from "vue";
import Router from "vue-router";
import IndexPage from "./views/IndexPage.vue";
import UsersListPage from "./views/UsersListPage.vue";
import AddUserPage from "./views/AddUserPage.vue";
import EditUserPage from "./views/EditUserPage.vue";

Vue.use(Router);

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: "/",
      component: IndexPage
    },
    {
      path: "/users",
      component: UsersListPage
    },
    {
      path: "/add",
      component: AddUserPage
    },
    {
      path: "/edit/:id", // динамический путь
      component: EditUserPage
    }
  ]
});
