<template>
    <div ref="n"
        @mousedown="moveStart"
        @mouseup="moveEnd"
        @mouseout="moveEnd"
        @mousemove="move"

        @touchstart="moveStart"
        @touchend="moveEnd"
        @touchmove="move"
        :style="{ height: `${3 * height}px` }" style="display: flex;align-items: center;" class="event-trigger-content">
        <div class="progress-container" :style="{ height: `${height}px` }">
            <div class="sub-line" ref="subNode" :style="lineStyle"></div>
            <div class="sub-block" :style="blockStyle"></div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, defineEmits } from 'vue'
const props = defineProps({
    percentage: {
        type: Number,
        default: 20
    },
    height: {
        type: Number,
        default: 100
    },
})
// data
const subNode = ref('')
const isMoving = ref(false)
const n = ref('')
// computed
const emits = defineEmits(['move'])
const lineStyle = computed(() => {
    return {
        width: `${props.percentage}%`
    }
})
const blockStyle = computed(() => {
    return {
        left: `calc(${props.percentage <= 0 ? '0.5rem' : props.percentage}% - 0.5rem)`
    }
})
const allWidth = computed(() => {
    return n.value.offsetWidth
})

// methods
const moveStart = (e) => {
    e.preventDefault()
    isMoving.value = true
}
const move =(e) => {
    e.preventDefault()
    if (isMoving.value) {
        let distance = 0
        if (e.type.includes('touch')) {
            const touch = e.targetTouches[0]
            distance = touch.pageX - e.target.offsetLeft
        } else {
            distance = e.offsetX
        }
        distance = distance >= 0 ? distance : 0
        emits('move', distance / allWidth.value * 100)
    }
}
const moveEnd =(e) => {
    e.preventDefault()
    isMoving.value = false
}
</script>
<style lang="scss" scoped>
.event-trigger-content {
    &:hover {
        .sub-block {
            height: 240%;
            top: -80%;
        }
    }
    cursor: pointer;
}
.progress-container {
    position: relative;
    // box-shadow: 0 0 1px 1px #f0f0f0;
    background: #f0f0f0;
    width: 100%;
    .sub-line {
        height: 100%;
        // width: 100%;
        position: absolute;
        left: 0;
        border-radius: 8px;
        background-color: blue;
        pointer-events:none;
    }

    .sub-block {
        position: absolute;
        // right: 50%;
        top: -50%;
        background-color: rgb(162, 143, 143);
        width: 0.5rem;
        border-radius: 8px;
        height: 200%;
        cursor: pointer;
        transition: height .5s;
        pointer-events:none;
    }

}
</style>