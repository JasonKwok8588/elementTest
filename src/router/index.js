import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../views/index/index.vue'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        component: index,

    },
    {
        path: '/login',
        component: () =>
            import ( /* webpackChunkName: "login" */ '../views/login/login.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router