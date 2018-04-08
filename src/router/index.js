import Vue from 'vue'
import Router from 'vue-router'

/*import Home from '@/components/Home.vue'
import Post from '@/components/Post.vue'
import Category from '@/components/Category.vue'*/

const Home = () => import(/* webpackChunkName: "home" */ '@/components/Home')
const Post = () => import(/* webpackChunkName: "post" */ '@/components/Post')
const Category = () => import(/* webpackChunkName: "category" */ '@/components/Category')


Vue.use(Router)
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/post/:id',
    name: 'post',
    component: Post,
  },
  {
    path: '/category/:id',
    name: 'category',
    component: Category,
  },
  {
    path: '*',
    redirect: '/',
  }
]

const router = new Router({
  base: process.env.ROUTER_BASE,
  routes,
  mode: 'history'
})

export default router
