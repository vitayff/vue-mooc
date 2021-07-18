import {createRouter, createWebHistory, onBeforeRouteUpdate, RouteRecordRaw} from "vue-router";

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
                path: '/discovery',
                name: '视频',
                component: () => import('../components/discovery/DiscoveryIndex.vue')
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
    {
        path: '/joinOne',
        name: '加入新课程',
        component: () => import('../components/home/AddOne.vue')
    },
    {
        path: '/createOne',
        name: '创建新课程',
        component: () => import('../components/home/createOne.vue')
    },
    {
        path: '/answer',
        name: '回答',
        component: () => import('../components/course/SubmitAnswer.vue')
    },
    {
        path: '/upload',
        name: '上传',
        component: () => import('../components/course/uploadfile.vue')
    },
    {
        path: '/course',
        name: '课程',
        component: () => import('../components/course/index.vue'),
        children: [
            {
                path: "/activity",
                name: "活动",
                component: () => import("../components/course/activity.vue"),
            },
            {
                path: '/resources',
                name: '资源',
                component: () => import('../components/course/resources.vue')
            },
            {
                path: '/member', // 默认子路由
                name: '成员',
                component: () => import('../components/course/member.vue')
            },
        ]
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
