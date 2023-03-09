<template>
    <div @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave" @touchstart="handleTouchStart"
        @touchmove="handleTouchMove" @touchend="handleTouchEnd" class="carousel" :style="{ height: `${height}px` }">
        <!-- <template slot="item"></template> -->
        <slot></slot>
        <div class="indicator" :style="{ width: `${indicatorWidth}px`, left: `calc(50% - ${indicatorWidth / 2}px)` }">
            <div class="indicator-sub" :style="{ width: `${indicatorLeft}px` }"></div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, onMounted, onBeforeUnmount, ref, watch } from 'vue'
import useCarousel from './useCarousel'
// props
const props = defineProps({
    indicatorPposition: {
        type: String,
        // none outside inside
        default: 'inside'
    },
    height: {
        type: Number,
        default: 200
    },
    duration: {
        type: Number,
        default: 2000
    }
})

// data
let timeId = ref(0)
let reStartTimeId = ref(-1)
const startX = ref(0)
const endX = ref(0)

let {
    currentIndex,
    nextIndex,
    prevIndex,
    items,
    direction,
    reSet
} = useCarousel()

const indicatorWidth = computed(() => {
    return 50
})

// computed
const indicatorLeft = computed(() => {
    return indicatorWidth.value / items.value.length * (currentIndex.value + 1)
})

// watch
watch(() => items.value, () => {
    prevIndex.value = currentIndex.value - 1
    if (prevIndex.value < 0) {
        prevIndex.value = items.value.length - 1
    }

    nextIndex.value = currentIndex.value + 1
    if (nextIndex.value >= items.value.length) {
        nextIndex.value = 0
    }
}, {
    deep: true
})

// methods
const animate = () => {
    const loopDirection = direction.value
    // left right
    if (loopDirection === 'left') {
        currentIndex.value += 1
        if (currentIndex.value >= items.value.length) {
            currentIndex.value = 0
        }
    } else if (loopDirection === 'right') {
        currentIndex.value -= 1
        if (currentIndex.value <= -1) {
            currentIndex.value = items.value.length - 1
        }
    }

    prevIndex.value = currentIndex.value - 1
    if (prevIndex.value < 0) {
        prevIndex.value = items.value.length - 1
    }

    nextIndex.value = currentIndex.value + 1
    if (nextIndex.value >= items.value.length) {
        nextIndex.value = 0
    }
}
const startTimer = () => {
    direction.value = 'left'
    if (timeId.value) clearInterval(timeId.value)
    timeId.value = setInterval(() => {
        animate()
    }, props.duration)
}
const pauseTimer = () => {
    clearInterval(timeId.value)
}

const handleMouseEnter = () => {
    pauseTimer()
}
const handleMouseLeave = () => {
    startTimer()
}


const handleTouchStart = (e) => {
    e.preventDefault()
    pauseTimer()
    const touch = e.targetTouches[0]
    startX.value = touch.pageX
}
const handleTouchMove = (e) => {
    e.preventDefault()
    const touch = e.targetTouches[0]
    endX.value = touch.pageX
}
const handleTouchEnd = (e) => {
    e.preventDefault()
    const dire = startX.value - endX.value > 0 ? 'left' : 'right'
    direction.value = dire
    animate()
    clearTimeout(reStartTimeId.value)
    reStartTimeId.value = setTimeout(() => {
        startTimer()
    }, props.duration * 2);
}

onMounted(() => {
    pauseTimer()
    startTimer()
})

onBeforeUnmount(() => {
    reSet()
    pauseTimer()
})

</script>
<style lang="scss" scoped>
.carousel {
    position: relative;
    overflow: hidden;
    // background: rgb(170, 193, 219);
}

.indicator {
    position: absolute;
    bottom: 10px;
    height: 3px;
    background: #fff;
    // border: 1px solid #999;
    border-radius: 4px;

    .indicator-sub {
        border-radius: 4px;
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        background: blue;
        transition: all .7s;
    }
}
</style>