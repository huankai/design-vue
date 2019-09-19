const Files = () => import("@/views/file/Files");
const FileAdd = () => import("@/views/file/FileAdd");

export default {
  files: [
    {
      path: "/file/list",
      meta: {
        title: "文件管理"
      },
      component: Files
    }, {
      path: "/file/add",
      meta: {
        parent: "/file/list",
        title: "文件管理-添加"
      },
      component: FileAdd
    }
  ]
}
