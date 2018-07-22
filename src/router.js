import Vue from 'vue'
import Router from 'vue-router'
import Container from './pages/Container.vue'
import SignIn from './pages/Auth/SignIn.vue'
import SignUp from './pages/Auth/SignUp.vue'

import Containers from './pages/Containers.vue'
import Account from './pages/Account.vue'
import Home from './pages/Home.vue'

import ContainerItems from './pages/Container/Items.vue'
import ContainerAddItem from './pages/Container/AddItem.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home, 
    },
    {
      path: '/container/:reference',
      name: 'container',
      component: Container,
      props: true
    },
    {
      path: '/container/:reference/items',
      name: 'container_items',
      component: ContainerItems,
      props: true
    },
    {
      path: '/container/:reference/items/add',
      name: 'container_add_item',
      component: ContainerAddItem,
      props: true
    },
    {
      path: '/containers',
      name: 'containers',
      component: Containers,
    },
    {
      path: '/account', 
      name: 'account',
      component: Account
    },
    {
      path: '/sign-in',
      name: 'sign-in',
      component: SignIn,
      props: true
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: SignUp,
      props: true
    }
  ]
})
