import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
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
    path: '/login',
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../components/Signup.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router