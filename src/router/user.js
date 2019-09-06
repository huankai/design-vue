const User = () => import("@/views/pms/user/User");
const UserEdit = () => import("@/views/pms/user/UserEdit");

/**
 * 用户管理
 */
export default {
  user: [{
    path: "/users",
    meta: {
      title: "用户管理"
    },
    component: User
  }, {
    path: "/users/add",
    meta: {
      parent: "/users",
      title: "用户管理 - 添加"
    },
    component: UserEdit
  }, {
    path: "/users/edit",
    meta: {
      parent: "/users",
      title: "用户管理 - 修改"
    },
    component: UserEdit
  }]
}
