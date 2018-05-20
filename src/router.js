import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('./views/IndexPage.vue')
    },
    {
      path: '/users',
      component: () => import('./views/UsersListPage.vue')
    },
    {
      path: '/add',
      component: () => import('./views/AddUserPage.vue')
    },
    {
      path: '/view/:id',
      component: () => import('./views/ViewUserPage.vue')
    },
    {
      path: '/edit/:id', // динамический путь
      component: () => import('./views/EditUserPage.vue')
    },
    {
      path: '/phonebook',
      component: () => import('./views/Phonebook.vue')
    }
  ]
})
