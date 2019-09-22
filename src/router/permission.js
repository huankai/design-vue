const Permission = () => import("@/views/pms/permission/Permission");
const PermissionEdit = () => import("@/views/pms/permission/PermissionEdit");

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
  },{
    path: "/permission/add",
    meta: {
      parent: "/permission",
      title: "权限管理 - 添加"
    },
    component: PermissionEdit
  },{
    path: "/permission/edit",
    meta: {
      parent: "/permission",
      title: "权限管理 - 编辑"
    },
    component: PermissionEdit
  }]
}
