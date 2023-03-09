<template>
  <div class="video-container">
    <video ref="videoNode" class="video-js vjs-default-skin vjs-big-play-centered">
      抱歉，您的浏览器暂不支持！
    </video>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue'
import videojs from "video.js";
//播放器中文，不能使用.js文件
import videozhCN from "video.js/dist/lang/zh-CN.json";
import "video.js/dist/video-js.css";
import "videojs-flash";
import "videojs-markers";
import "videojs-markers/dist/videojs.markers.css";

const props = defineProps({
  src: {},
  type: {},
  markers: {},
  options: {
    type: Object
  }
})

const player = ref(null)
const videoNode = ref(null)

const baseOptions = {
  autoplay: true, //自动播放
  language: "zh-CN",
  controls: true, //控制条
  preload: "auto", //自动加载
  errorDisplay: true, //错误展示
  // fluid: true, //跟随外层容器变化大小，跟随的是外层宽度
  // width: "500px",
  // height: "500px",
  // controlBar: false,  // 设为false不渲染控制条DOM元素，只设置controls为false虽然不展示，但是存在
  // textTrackDisplay: false,  // 不渲染字幕相关DOM
  userActions: {
    hotkeys: true //是否支持热键
  },
  notSupportedMessage: "此视频暂无法播放，请稍后再试",
  techOrder: ["html5"],//定义Video.js技术首选的顺序

}
const addPoint = () => {
  player.value.markers({
    markerStyle: {
      // 标记点样式
      width: "0.7em",
      height: "0.7em",
      bottom: "-0.20em",
      "border-radius": "50%",
      "background-color": "orange",
      position: "absolute"
    },
    //鼠标移入标记点的提示
    markerTip: {
      display: true,
      text: function (marker: any) {
        return marker.text;
      }
    },
    markers: props.markers
  })
}
const initPlayer = () => {

  videojs.addLanguage("zh-CN", videozhCN);

  player.value = videojs(
    videoNode.value,
    {
      ...baseOptions,
      ...props.options,
      sources: [
        {
          src: props.src || 'https://kvideo01.youju.sohu.com/89e64992-0609-46ed-b3d6-b6ca7821a2f22_0_0.mp4',
          type: props.type || 'video/mp4',
        }
      ]
    },
    function onPlayerReady() {
      videojs.log(`Your player is ready!`);
    }
  );

  addPoint()
}

onMounted(() => {
  initPlayer()
})
</script>