const Schedule = () => import("@/views/schedule/Schedule");
const ScheduleLog = () => import("@/views/schedule/ScheduleLog");
const ScheduleEdit = () => import("@/views/schedule/ScheduleEdit");
const ScheduleDetail = () => import("@/views/schedule/ScheduleDetail");

export default {
  schedule: [
    {
      path: "/schedule",
      name: "schedule",
      meta: {
        title: "定时任务管理"
      },
      component: Schedule
    }, {
      path: "/schedule/add",
      name: "scheduleAdd",
      meta: {
        title: "定时任务 - 添加"
      },
      component: ScheduleEdit
    }, {
      path: "/schedule/edit",
      name: "scheduleEdit",
      meta: {
        title: "定时任务 - 修改"
      },
      component: ScheduleEdit
    }, {
      path: "/schedule/detail",
      name: "scheduleDetail",
      meta: {
        title: "定时任务 - 详情"
      },
      component: ScheduleDetail
    }, {
      path: "/schedule/log",
      name: "scheduleLog",
      meta: {
        title: "定时任务 - 日志"
      },
      component: ScheduleLog
    }
  ]
}
