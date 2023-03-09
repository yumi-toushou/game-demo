<template>
    <div ref="main" class="main" :style="{ height: `${height}px`, fontSize: `${fontSize}px` }">
        <div class="text">
            {{ text }}
        </div>
        <canvas @mousedown="clearBegin" @mousemove="clearBegin" @mouseup="clearEnd" @touchstart="clearBegin"
            @touchmove="clearCanvas" @touchend="clearEnd" ref='canvasNode' class="canvas" :width="width"
            :height="height"></canvas>
    </div>
</template>
<script lang="ts" setup>
import { onMounted, ref, computed, watch, nextTick } from 'vue';

// props
const props = defineProps({
    text: {
        type: String,
        default: '谢谢惠顾'
    },
    height: {
        type: Number,
        default: 50
    },
    fontSize: {
        type: Number,
        default: 25
    }
})

// data
const canvasNode = ref('')
const main = ref('')
const startClear = ref(false)

const width = computed(() => {
    return main.value.clientWidth
})
watch(() => width.value, (val) => {
    nextTick(() => {
        initCanvas(val)
    });
})
// methods
const initCanvas = (width: number) => {
    const ctx = canvasNode.value?.getContext('2d')
    ctx.fillStyle = 'gray'
    ctx.fillRect(0, 0, width, props.height)
}

const clearBegin = (e) => {
    e.preventDefault()
    startClear.value = true
}
const clearCanvas = (e) => {
    e.preventDefault()
    if (!startClear.value) return
    const ctx = canvasNode.value?.getContext('2d')
    const {
        clientX,
        clientY
    } = e.targetTouches[0]

    const l = 10, r = l / 2;

    ctx.beginPath()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.fillStyle = '#fff'
    ctx.arc(clientX - main.value.offsetLeft, clientY - main.value.offsetTop, r, 0, 2 * Math.PI)
    console.log()
    ctx.fill()
    ctx.closePath()
    // ctx.clearRect(clientX - main.value.offsetLeft - r, clientY - main.value.offsetTop - r, l, l)
}
const clearEnd = (e) => {
    e.preventDefault()
    startClear.value = false
}

onMounted(() => {

})
</script>
<style scoped lang="scss">
.main {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 500;
    overflow: hidden;
}

.text {
    color: gray;
}

.canvas {
    position: absolute;
    background: transparent;
}
</style>