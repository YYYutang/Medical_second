import Vue from 'vue'
import VueRouter from 'vue-router'
import SideBar from '@/components/sideBar/index.vue'
import dash from '@/views/dash/index.vue'
import dataManage from "@/views/dataManage/dataManage.vue";

import interactionDivide from '@/views/InteractionDivide/index.vue'
import multicluster from '@/views/multicluster/index.vue'
import peopleDivide from "@/views/peopleDivide/index.vue"
import introduce from "@/views/introduce/intoduce.vue"
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
      path: '/peopleDivide',
      name: 'peopleDivide',
      component: peopleDivide,
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
