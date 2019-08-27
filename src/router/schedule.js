const Schedule = () => import("@/views/schedule/Schedule");

export default {
  schedule: [
    {
      path: "/schedule",
      meta: {
        title: "定时任务管理"
      },
      component: Schedule
    }
  ]
}
