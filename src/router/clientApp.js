const ClientApp = () => import("@/views/pms/app/ClientApp");
const ClientAppEdit = () => import("@/views/pms/app/ClientAppEdit");

/**
 * client 应用
 */
export default {
  clientApp: [{
    path: "/app",
    meta: {
      title: "应用管理"
    },
    component: ClientApp,
  },
    {
      path: "/app/add",
      meta: {
        title: "应用管理-添加"
      },
      component: ClientAppEdit
    },
    {
      path: "/app/edit",
      meta: {
        title: "应用管理-修改"
      },
      component: ClientAppEdit
    }]
}
