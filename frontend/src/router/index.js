import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import Signup from '../components/Signup.vue'
import Post from '../views/Post.vue'
import Admin from '../components/Admin.vue'
import Profile from '../components/Profile.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: Dashboard
  },
  {
    path: '/admin/',
    name: 'admin',
    component: Admin
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
]

const router = new VueRouter({
  routes
})

export default router