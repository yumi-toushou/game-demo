<template>
  <VideoPlayer :markers="markers" />
</template>
<script setup lang="ts">
import { ref } from 'vue'
import VideoPlayer from '@/components/Video/index.vue'
const markers = ref([
  {
    time: 20,
    text: '点位一'
  },
  {
    time: 40,
    text: '点位二'
  },
  {
    time: 130,
    text: '点位三'
  },
  {
    time: 200,
    text: '点位四'
  }
])
</script>
