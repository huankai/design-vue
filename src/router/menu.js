const Menu = () => import("@/views/pms/menu/Menu");
const MenuEdit = () => import("@/views/pms/menu/MenuEdit");

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
  }, {
    path: "/menu/add",
    meta: {
      parent: "/menu",
      title: "菜单管理 - 添加"
    },
    component: MenuEdit
  }, {
    path: "/menu/edit",
    meta: {
      parent: "/menu",
      title: "菜单管理 - 修改"
    },
    component: MenuEdit
  }, {
    path: "/menu/tree",
    meta: {
      parent: "/menu",
      title: "菜单管理 - 树形结构"
    },
    component: () => import("@/views/pms/menu/MenuTreeList")
  }]
}
