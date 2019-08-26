const User = () => import("@/views/pms/user/User");

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
  }]
}
