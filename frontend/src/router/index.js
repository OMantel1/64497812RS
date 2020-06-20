import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
// import Header from '../components/Header.vue'
import Signup from '../components/Signup.vue'
import Post from '../views/Post.vue'
import Admin from '../components/Admin.vue'
import Profile from '../components/Profile.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    name: 'home',
    component: () => import( /* webpackChunkName: "about" */ '../views/Home.vue')
    // children: [
    //   { path: '', component: Dashboard}
    // ]
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
    // children: [
    //   { path: '', component: Header}
    // ]
    // component: () => import( /* webpackChunkName: "about" */ '../components/Dashboard.vue'),
  },
  // {
  //   path: '/dashboard',
  //   name: 'header',
  //   // component: Dashboard
  //   component: () => import( /* webpackChunkName: "about" */ '../components/Header.vue'),
  // },
  
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import( /* webpackChunkName: "about" */ '../components/Signup.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router