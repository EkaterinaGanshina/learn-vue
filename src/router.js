import Vue from "vue";
import Router from "vue-router";
import IndexPage from "./views/IndexPage.vue";

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
      component: () => import('./views/UsersListPage.vue')
    },
    {
      path: "/add",
      component: () => import('./views/AddUserPage.vue')
    },
    {
      path: "/edit/:id", // динамический путь
      component: () => import('./views/EditUserPage.vue')
    }
  ]
});
