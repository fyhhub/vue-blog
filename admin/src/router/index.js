import Vue from 'vue'
import Router from 'vue-router'
import Login from '../pages/admin/Login.vue'
import Admin from '../pages/admin/Admin.vue'
import Home from '../components/admin/Home.vue'
import store from '../store/index'
import _404 from '../pages/admin/404.vue'
import Tags from '../components/admin/Tags.vue'
import Write from '../components/admin/Write.vue'
import VerifyArticle from '../components/admin/VerifyArticle.vue'
Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/login',
            name: 'Login',
            component:Login
        },
        {
            path: '/admin',
            name: 'Admin',
            meta: {
                requireAuth: true
            },
            component: Admin,
            children: [
                {
                    path: '/admin/home',
                    name: '仪表盘',
                    meta: {
                        requireAuth: true
                    },
                    component: Home,
                },
                {
                    path: '/admin/tags',
                    name: '标签管理',
                    meta: {
                        requireAuth: true
                    },
                    component: Tags,
                },
                {
                    path: '/admin/write',
                    name: '发布文章',
                    meta: {
                        requireAuth: true
                    },
                    component: Write
                },
                {
                    path: '/admin/verifyArticle',
                    name: '审核文章',
                    meta: {
                        requireAuth: true
                    },
                    component: VerifyArticle
                },
            ],
            redirect: '/admin/home'
        },
        {
            path: '/404',
            name: '404',
            component: _404
        },
        {
            path: '*',
            redirect: '/404',
            hidden: true
        }
    ]
})
router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (store.state.token) {
            return next()
        }
        next({
            path: '/login',
            query: { redirect: to.fullPath }
        })
    } else {
        next()
    }
})
export default router
