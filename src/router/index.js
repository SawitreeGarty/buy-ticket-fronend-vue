import Vue from 'vue'
import VueRouter from 'vue-router'
import BuyTickets from '../views/BuyTickets.vue'
import SummaryList from '../views/SumaryList.vue'
import ReportDaily from '../views/RepoportDialy.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'buytickets',
    component: BuyTickets
  },
  {
    path: '/summarylist',
    name: 'summarylist',
    component: SummaryList
  },
  {
    path: '/reportdialy',
    name: 'reportdialy',
    component: ReportDaily
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
