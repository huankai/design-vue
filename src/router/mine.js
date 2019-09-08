const Mine = () => import("@/views/pms/mine/Mine");

/**
 * 个人管理
 */
export default {
  mine: [{
    path: "/mine/settings",
    redirect: "/mine/settings/base",
    component: Mine,
    children: [
      {
        path: "/mine/settings/base",
        component: () => import("@/views/pms/mine/Base"),
        meta: {title: "基本设置", parent: "/mine/settings"}
      },
      {
        path: "/mine/settings/security",
        component: () => import("@/views/pms/mine/Security"),
        meta: {title: "安全设置", parent: "/mine/settings"}
      }
    ]
  }]
}

