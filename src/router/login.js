export default {
  login: [{
    path: "/login",
    meta: {
      title: "用户登录"
    },
    component: () => import("@/views/login/Login")
  }]
}
