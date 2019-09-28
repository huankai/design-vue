<template>
  <div>
    <video-player class="video-player-box"
                  ref="videoPlayer"
                  :options="playerOptions"
                  :playsinline="true"
                  @play="onPlayerPlay($event)"
                  @pause="onPlayerPause($event)"
                  @statechanged="playerStateChanged($event)"
                  @ready="playerReadied">
    </video-player>
  </div>
</template>

<script>

  import {videoPlayer} from "vue-video-player"
  import "video.js/dist/video-js.min.css"

  export default {
    name: "VideoPlayer",
    components: {videoPlayer},
    data() {
      return {
        playerOptions: {
          height: document.documentElement.clientHeight,
          width: document.documentElement.clientWidth,
          muted: true,
          language: "zh-CN",
          playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
          autoplay: false, // 是否自动播放
          fluid: false,
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: true,
            fullscreenToggle: true  //全屏按钮
          },
          sources: [
            {
              type: "video/mp4",
              src: "/video/1.mp4"
            }
          ],
          poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-6.jpg"
        }
      }
    },
    computed: {
      player() {
        return this.$refs.videoPlayer.player
      }
    },
    methods: {
      // listen event
      onPlayerPlay(player) {
        // console.log('player play!', player)
      },
      onPlayerPause(player) {
        // console.log('player pause!', player)
      },
      // ...player event

      // or listen state event
      playerStateChanged(playerCurrentState) {
        // console.log('player current update state', playerCurrentState)
      },

      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      }
    }
  }
</script>

<style scoped>
</style>
