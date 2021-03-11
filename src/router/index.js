import Vue from 'vue'
import VueRouter from 'vue-router'
import Recommend from '../views/Recommend.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',//路由默认匹配的首页
    name: 'Recommend',
    component: Recommend,
    meta:{showNav:true}  //meta路由原信息.
  },
  {
    path: '/hot',//路由默认匹配的首页
    name: 'Hot',
    component: ()=>import('../views/Hot'),//懒加载
    meta:{showNav:true}
  },
  {
    path: '/hot/:num',//路由默认匹配的首页
    name: 'Hot',
    component: ()=>import('../views/Hot'),//懒加载
    meta:{showNav:true}
  },
  {
    path:'/musiclist/:musicid',
    component:()=>import('../views/MusicList'),
    meta:{showNav:false}
  },
  {
    path:"/search",
    component:()=>import('../views/Search'),
    meta:{showNav:true}
  },
  {
    path:"/more",
    component:()=>import('../views/more'),
  },
  {
    path:"/btnmusic/:id",
    component:()=>import('../views/BtnMusic'),
  },
  {
    path:"/albumlist/:id",
    component:()=>import('../views/Albumlist'),
  },
]

const router = new VueRouter({
  mode:"hash",
  routes
})

export default router
