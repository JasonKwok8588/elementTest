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
    },
    {
        path: '/homepage',
        component: () =>
            import ( /* webpackChunkName: "homepage" */ '../views/homepage/homepage.vue'),
        children: [{
                path: '/department',
                component: () =>
                    import ( /* webpackChunkName: "department" */ '../views/department/department.vue'),
            },
            {
                path: '/employee',
                component: () =>
                    import ( /* webpackChunkName: "department" */ '../views/employee/employee.vue'),
            },
        ]

    }
]

const router = new VueRouter({
    routes
})

export default router