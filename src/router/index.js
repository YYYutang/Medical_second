import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import dataManage from "@/views/dataManage/dataManage.vue";
import interactionDivide from '@/views/InteractionDivide/index.vue'
import multicluster from '@/views/multicluster/index.vue'
import logIn from "@/views/User/login.vue"
import peopleDivide from "@/views/peopleDivide/index.vue"
import introduce from "@/views/introduce/intoduce.vue"
import register from "@/views/User/register.vue"
import columnManage from "@/views/columnManage/columnManage.vue"
import operationManage from "@/views/operationManage/operationManage"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'logIn',
    component: logIn
  },
  {
    path: '/register',
    name: 'register',
    component: register
  },
  {
    path: '/first',
    redirect: '/introduce',
    name: 'first',
    component: SideBar,
    children: [{
      path: '/dash',
      name: 'dash',
      component: dash
    },


    {
      path: '/interactionDivide',
      name: 'interactionDivide',
      component: interactionDivide,
    },
    {
      path: '/multicluster',
      name: 'multicluster',
      component: multicluster,
    },
    {
      path: '/operationManage',
      name: 'operationManage',
      component: operationManage,
    },
    {
      path: '/peopleDivide',
      name: 'peopleDivide',
      component: peopleDivide,
    },
    {
      path: '/columnManage',
      name: 'columnManage',
      component: columnManage,
    },
    {
      path: '/dataManage',
      name: 'dataManage',
      component: dataManage,
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: introduce,
    },

    ]
  },
]

const router = new VueRouter({
  routes
})
export default router
