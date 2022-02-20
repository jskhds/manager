import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../../src/components/Home.vue"
const routes = [
    // 1.根组件
    {
        name:'home',
        path:'/',
        component:Home,
        // 定义源数据
        meta:{
            title:'首页'
        },
        redirect:'/welcome',
        children:[
            {
                name:'welcome',
                path:'/welcome',
                meta:{
                    title:'欢迎页'
                },
                component:()=>import('./../views/Welcome.vue'),
            },
            
        ]
    },
    // 2.入口的登录页（另外写）
    {
        name:'login',
        path:'/login',
        meta:{
            title:'登录'
        },
        component:()=>import('./../views/Login.vue')
    }
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router