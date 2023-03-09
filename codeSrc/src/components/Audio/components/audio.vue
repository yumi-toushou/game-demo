<template>
    <Progress :percentage="percentage" @move="changeProgress" style="flex: 1;" :height="2" />
    <div class="audio-content">
        <audio ref="audioNode" :src="src" autoplay
            @timeupdate="timeupdate"
            @ended="ended"
            @play="played"
        >
            <source type="mp3" :src="src" />
            您的浏览器不支持 audio 元素。
        </audio>
        <div class="control">
            <span @click="prev" class="prev">
                <el-icon>
                    <CaretLeft />
                </el-icon>
            </span>
            <span @click="pause" class="pause">
                <el-icon v-if="isVoucl">
                    <VideoPause />
                </el-icon>
                <el-icon v-else>
                    <VideoPlay />
                </el-icon>
            </span>
            <span @click="next" class="next">
                <el-icon>
                    <CaretRight />
                </el-icon>
            </span>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted, onUnmounted, inject, defineExpose } from 'vue'
import { VideoPause, VideoPlay, CaretLeft, CaretRight } from '@element-plus/icons-vue'
import Progress from '@/components/Progress/index.vue'
import useAudio from './useAudio.ts'

const props = defineProps({
    src: {
        type: String,
    }
})
const emits = defineEmits(['prev', 'next'])
const analyser = inject('analyser')
const draw = inject('draw')
// data
const { setAudioNode } = useAudio()
const audioNode = ref('')
const isVoucl = ref(false)
const percentage = ref(0)


defineExpose({
    isVoucl
})
// watch
watch(() => isVoucl.value, (val) => {
    if (val) {
        if (analyser.value.context.state !== 'running') {
            analyser.value.context.resume()
        }

        audioNode.value.play()
        draw()
    } else {
        audioNode.value.pause()
    }
}, {
    deep: true
})

watch(() => props.src, ()=>{
    reSet()
})

// methods
const reSet = () => {
    percentage.value = 1
}

const prev = () => {
    emits('prev')
}

const next = () => {
    emits('next')
}

const pause = () => {
    isVoucl.value = !isVoucl.value
}
const timeupdate = (e) => {
    percentage.value = 100 * e.target.currentTime / e.target.duration 
}
const ended = (e) => {
    isVoucl.value = false
}
const played = () => {
    isVoucl.value = true
}
const changeProgress = (progress: number) => {
    percentage.value = progress
    audioNode.value.currentTime = audioNode.value.duration * progress / 100
}

onMounted(() => {
    setAudioNode(audioNode.value)
})

onUnmounted(() => {
    setAudioNode(null)
})
</script>
<style lang="scss" scoped>
.audio-content {
    // height: 100%;
    position: relative;
    background: transparent;
    // box-shadow: 0px 0px  1px 1px #999;
    .control {
        // position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 2rem;
        margin-top: 10px;
        .pause {
            margin: 0 2rem;
            font-size: 3rem;
        }
    }
}
</style>