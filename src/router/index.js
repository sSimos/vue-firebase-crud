import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Edit from '@/views/Edit.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import Verification from '@/views/Verification.vue'
import PasswordReset from '@/views/PasswordReset.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/verification',
    name: 'Verification',
    component: Verification
  },
  {
    path: '/password',
    name: 'PasswordReset',
    component: PasswordReset
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
