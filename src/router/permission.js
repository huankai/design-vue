const Permission = () => import("@/views/pms/permission/Permission");

/**
 * 用户管理
 */
export default {
  permission: [{
    path: "/permission",
    meta: {
      title: "权限管理"
    },
    component: Permission
  }]
}
