const Role = () => import("@/views/pms/role/Role");
const RoleEdit = () => import("@/views/pms/role/RoleEdit");

/**
 * 用户管理
 */
export default {
  role: [{
    path: "/roles",
    meta: {
      title: "角色管理"
    },
    component: Role
  },{
      path: "/roles/add",
      meta: {
        parent: "/roles",
        title: "角色管理 - 添加"
      },
      component: RoleEdit
    },{
    path: "/roles/edit",
    meta: {
      parent: "/roles",
      title: "角色管理 - 编辑"
    },
    component: RoleEdit
  }
  ]
}
