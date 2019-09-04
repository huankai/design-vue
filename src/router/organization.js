const Organization = () => import("@/views/pms/org/Organization");
const OrganizationEdit = () => import("@/views/pms/org/OrganizationEdit");

export default {
  organization: [
    {
      path: "/org",
      meta: {
        title: "机构管理"
      },
      component: Organization
    }, {
      path: "/org/add",
      meta: {
        title: "机构管理 - 添加"
      },
      component: OrganizationEdit
    }, {
      path: "/org/edit",
      meta: {
        title: "机构管理 - 修改"
      },
      component: OrganizationEdit
    }
  ]
}
