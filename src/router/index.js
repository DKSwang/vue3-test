/*
 * @Author: xxuzhong.wang
 * @Date: 2021-01-27 16:33:27
 * @LastEditors: xuzhong.wang
 * @LastEditTime: 2021-02-07 10:31:51
 * @Description: 
 */
import {
    createRouter,
    createWebHistory
} from 'vue-router'

const routes = [{
        path: '/',
        name: 'Login',
        component: () => import( /* webpackChunkName: "about" */ '../views/login/Login.vue')
    },
    {
        path: "/",
        name: "Wrapper",
        component: () => import( /* webpackChunkName: "about" */ "../components/Wrapper.vue"),
        children: [{
                path: "/home",
                name: "home",
                component: () => import("../views/home/Home.vue"),
                meta: {
                    name: "首页"
                }
            },
            {
                path: "/loanafterManage/batchAdjustment",
                name: "batchAdjustment",
                component: () =>
                    import("@/views/loanafterManage/batchAdjustment/index.vue"),
                meta: {
                    name: "批量调额"
                }
            },
            {
                path: "/modifyPassWord",
                name: "modifyPassWord",
                component: () => import("../views/modifyPassWord/index.vue"),
                meta: {
                    name: "修改密码"
                }
            },
            {
                path: "/test",
                name: "test",
                component: () => import("../views/Test/test.vue"),
                meta: {
                    name: "测试页面"
                }
            },
            {
                path: "/testChildren",
                name: "testChildren",
                component: () => import("../views/Test/testChildren.vue"),
                meta: {
                    name: "测试子页面"
                }
            },
        ]
    },

    {
        path: '/:catchAll(.*)',
        name: '404',
        component: () => import( /* webpackChunkName: "about" */ '../views/notFind/notPage.vue')
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router