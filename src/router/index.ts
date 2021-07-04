import {createRouter, createWebHistory, RouteRecordRaw} from "vue-router";

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        name: "home",
        component: () => import("../views/Index.vue"),
        children: [
            {
                path: "/",
                name: "首页",
                component: () => import("../components/home/Index.vue"),
            },
            {
                path: '/qa', // 默认子路由
                name: '问答',
                component: () => import('../components/qa/QaIndex.vue')
            },
            {
                path: '/video',
                name: '视频',
                component: () => import('../components/Video.vue')
            },
            {
                path: '/my', // 默认子路由
                name: '我的',
                component: () => import('../components/My/MyIndex.vue')
            },
        ]
    },
    {
        path: '/login',
        name: '登录',
        component: () => import('../components/Login/LoginIndex.vue')
    },
    // {
    //     path: '/',
    //     component: () => import('../views/layout/'),
    //     children: [
    //         {
    //             path: '', // 默认子路由
    //             name: 'home',
    //             component: () => import('../views/home/')
    //         },
    //         {
    //             path: '/qa',
    //             name: 'qa',
    //             component: () => import('../views/qa/')
    //         },
    //         {
    //             path: '/video',
    //             name: 'video',
    //             component: () => import('../views/video/')
    //         },
    //         {
    //             path: '/my',
    //             name: 'my',
    //             component: () => import('../views/my/')
    //         }
    //     ]
    // }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
