const Dashboard = () => import("@/views/dashboard/Dashboard");

export default {
  dashboard: [{
    path: "",
    meta: {
      title: "首页"
    },
    component: Dashboard
  }]
}
