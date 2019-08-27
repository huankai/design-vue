const Role = () => import("@/views/pms/role/Role");

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
  }]
}
