import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

const Dashboard = () => import("@/views/dashboard/Dashboard");
const ClientApp = () => import("@/views/pms/app/ClientApp");
const ClientAppEdit = () => import("@/views/pms/app/ClientAppEdit");

const User = () => import("@/views/pms/user/User");

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "",
      meta: {
        title: "首页"
      },
      component: Dashboard
    },
    {
      path: "/app",
      meta: {
        title: "应用管理"
      },
      component: ClientApp,
      // children: [
      //   {
      //     path: "add",
      //     meta: {
      //       title: "应用管理-添加"
      //     },
      //     component: ClientAppEdit
      //   },
      //   {
      //     path: "/edit",
      //     meta: {
      //       title: "应用管理-修改"
      //     },
      //     component: ClientAppEdit
      //   }
      // ]
    },
    {
      path: "/app/add",
      meta: {
        title: "应用管理-添加"
      },
      component: ClientAppEdit
    },
    {
      path: "/app/edit",
      meta: {
        title: "应用管理-修改"
      },
      component: ClientAppEdit
    },
    {
      path: "/users",
      meta: {
        title: "用户管理"
      },
      component: User
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "后台管理系统";
  next();// 重写beforeEach 后，必须调用 next()方法，否则所有的路由无法调用， vue router 默认就是调用了 next()
});

export default router;
