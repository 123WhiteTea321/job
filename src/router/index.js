
// import vue from 'vue'
// import VueRouter from 'vue-router'

//配置路由
import { def } from '@vue/shared'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'

//引入组件
import Home from '../views/HomeView.vue'
import Index from '../views/IndexView.vue'
// import Note from '../views/NoteView.vue'
// import Search from '../views/SearchView.vue'
// import User from '../views/UserView.vue'

//路由映射对象
const routes = [
    {
        path: '/',
        component: Index,    //在上面注册了
        redirect: '/home',
        children: [          //children会引起路径的变化
            {
                //路由路径
                path: '/home',
                component: Home,
            },
            {
                path: '/search',
                component: () => import('../views/SearchView.vue')   //选择这种导入方式的话就不用在上面import Search from '../views/SearchView.vue'
            },
            {
                path: '/note',
                component: () => import('../views/NoteView.vue')  //没有在App.vue那边使用<router-view></router-view>的话什么都没有显示
            },
            {
                path: '/user',
                component: () => import('../views/UserView.vue')  //有chidren的话在包含children的那一个组件里加router-view
                //如果children就包含在第一个里面，App.vue也要加上router-view
            }
        ]
    },
    {
        path: '/play',
        component: () => import('../views/PlayView.vue')
    },
    {
        path: '/SearchMsg',
        component: () => import('../views/SearchMsg.vue')

    },
    {
        path: '/login',        //为什么在login里的children[]挂/register，路径不是/login/register呢，明明上面的index是这样
        component: () => import('../views/LoginView.vue'),

    },
    {
        path: '/register',
        component: () => import('../views/RegisterView.vue'),
    }
    ,{
        path:'/cateDetails',
        component:()=> import('../views/CategoryView.vue')
    }
    ,{
        path:'/noteDetails',
        component:()=> import('../views/NoteDetailsView.vue')
    },{
        path:'/userInfo',
        component:()=> import('../views/UserInfoView.vue')
    }

]

//创建路由实例对象
const router = createRouter({
    routes,
    history: createWebHashHistory()

})

//暴露router
export default router

