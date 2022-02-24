import { createRouter, createWebHashHistory } from "vue-router";
import Home from "./../components/Home.vue";
import storage from "../utils/storage"
import API  from "../api"
import utils from "../utils/utils";
const routes = [
  {
    name: "home",
    path: "/",
    meta: {
      title: "首页",
    },
    component: Home,
    redirect: "/welcome",
    children: [
      {
        name: "welcome",
        path: "/welcome",
        meta: {
          title: "欢迎页",
        },
        component: () => import("./../views/Welcome.vue"),
      },
      // {
      //   name: "menu",
      //   path: "/system/menu",
      //   meta: {
      //     title: "菜单管理",
      //   },
      //   component: () => import("./../views/Menu.vue"),
        
      // },
      /*{
        name: "user",
        path: "/system/user",
        meta: {
          title: "用户管理",
        },
        component: () => import("./../views/User.vue"),
        
      },      
      
      {
        name: "role",
        path: "/system/role",
        meta: {
          title: "角色管理",
        },
        component: () => import("./../views/Role.vue"),
        
      },
      {
        name: "dept",
        path: "/system/dept",
        meta: {
          title: "部门管理",
        },
        component: () => import("./../views/Dept.vue"),
        
      },*/
    ],
  },
  {
    name: "login",
    path: "/login",
    meta: {
      title: "登录",
    },
    component: () => import("./../views/Login.vue"),
  },
  {
    name: "404",
    path: "/404",
    meta: {
      title: "页面未找到",
    },
    component: () => import("./../views/404.vue"),
  },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.addRoute("home",{
//   name:"menu",
//   path:"/system/menu",
//   meta:{
//     title:"菜单管理",
//   },
//   component: ()=>import('../views/Menu.vue')
// })


// 动态生成路由
async function loadAsyncRoutes() {
  let userInfo = storage.getItem('userInfo') || {}
  if (userInfo.token) {
      try {
          const { menuList } = await API.getPermissionList()
          let routes = utils.generateRoute(menuList)
          const modules = import.meta.glob('../views/*.vue')
          // console.log('views',modules)
          routes.map(route => {
              let url = `../views/${route.name}.vue`
              route.component = modules[url];
              router.addRoute("home", route);
          })
      } catch (error) {

      }
  }
}
loadAsyncRoutes();


// 判断当前地址是否可以访问
// function checkPermission(path) {
//   let hasPermission = router.getRoutes().filter(route => route.path == path).length;
//   if (hasPermission) {
//       return true;
//   } else {
//       return false;
//   }
// }

// 导航守卫
// 去哪，从哪里来，到了之后要做什么
router.beforeEach(async (to, from, next) => {
  if (to.name) {
    // 返回的数据里面有 name 就相当于有 path
      if (router.hasRoute(to.name)) {
        // 页面写入元数据title
          document.title = to.meta.title;
          next()
      } else {
          next('/404')
      }
  } else {
      await loadAsyncRoutes()
      let curRoute = router.getRoutes().filter(item => item.path == to.path)
      if (curRoute?.length) {
          document.title = curRoute[0].meta.title;
          next({ ...to, replace: true })
      } else {
          next('/404')
      }
  }
})


export default router;
