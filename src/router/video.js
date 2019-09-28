export default {
  video: [{
    path: "/video",
    meta: {
      title: "视频播放"
    },
    component: () => import("@/views/video/VideoPlayer")
  }]
}
