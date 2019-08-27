const Menu = () => import("@/views/pms/menu/Menu");

/**
 * 用户管理
 */
export default {
  menu: [{
    path: "/menu",
    meta: {
      title: "菜单管理"
    },
    component: Menu
  }]
}
