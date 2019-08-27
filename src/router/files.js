const Files = () => import("@/views/file/Files");

export default {
  files: [
    {
      path: "/file",
      meta: {
        title: "文件管理"
      },
      component: Files
    }
  ]
}
