import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter);

import Dashboard from "@/router/dashboard";
import ClientApp from "@/router/clientApp"
import User from "@/router/user"
import Role from "@/router/role"
import Permission from "@/router/permission"
import Menu from "@/router/menu"

/*
  emi--- address
 */
import Address from "@/router/address";
/*
  emi--- dict
 */
import Dict from "@/router/dict"
import Schedule from "@/router/schedule";
import Files from "@/router/files";
import Organization from "@/router/organization";


const router = new VueRouter({
  mode: "history",
  // base: "/vue",
  routes: [
    ...Dashboard.dashboard,
    ...ClientApp.clientApp,
    ...Organization.organization,
    ...User.user,
    ...Role.role,
    ...Permission.permission,
    ...Menu.menu,
    ...Address.address,
    ...Dict.dict,
    ...Files.files,
    ...Schedule.schedule
  ]
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || "后台管理系统";
  next();// 重写beforeEach 后，必须调用 next()方法，否则所有的路由无法调用， vue router 默认就是调用了 next()
});

export default router;
