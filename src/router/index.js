import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [

    {
        path: '/login',
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/login/login.vue')
    }
]

const router = new VueRouter({
    routes
})

export default router