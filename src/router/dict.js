const Dict = () => import("@/views/emi/dict/Dict");
const DictEdit = () => import("@/views/emi/dict/DictEdit");
const DictChild = () => import("@/views/emi/dict/DictChild");
const DictChildEdit = () => import("@/views/emi/dict/DictChildEdit");

export default {
  dict: [
    {
      path: "/dict",
      meta: {
        title: "字典管理"
      },
      component: Dict
    }, {
      path: "/dict/add",
      meta: {
        title: "字典管理 - 添加"
      },
      component: DictEdit
    }, {
      path: "/dict/edit",
      meta: {
        title: "字典管理 - 修改"
      },
      component: DictEdit
    }, {
      path: "/dict/child",
      name: "dictChild",
      meta: {
        title: "字典管理 - 子级"
      },
      component: DictChild
    }, {
      path: "/childDict/add",
      meta: {
        title: "字典子级 - 添加"
      },
      component: DictChildEdit
    }, {
      path: "/childDict/edit",
      meta: {
        title: "字典子级 - 修改"
      },
      component: DictChildEdit
    }
  ]
}
