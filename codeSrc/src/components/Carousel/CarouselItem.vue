<template #item>
    <div class="carousel-item-contant" :style="className">
        <slot></slot>
    </div>
</template>
<script setup lang="ts">
import useCarousel from './useCarousel'
import { computed, getCurrentInstance, onMounted, onUnmounted } from 'vue'

let vm = getCurrentInstance()
let {
    currentIndex,
    nextIndex,
    prevIndex,
    addItem,
    removeItem,
    items,
    direction
} = useCarousel()

// computed
const className = computed(() => {
    const style = {
        transform: '',
        transition: ''
    }
    switch (direction.value) {
        case 'right':
            if (items.value[currentIndex.value]?.uid === vm?.uid) {
                style['transform'] = `translateX(0)`
            } else if (prevIndex.value != -1 && items.value[prevIndex.value].uid === vm?.uid) {
                style['transform'] = `translateX(-100%)`
                style['transition'] = `all 0s`
            } else if (nextIndex.value != -1 && items.value[nextIndex.value]?.uid === vm?.uid) {
                style['transform'] = `translateX(100%)`
            }
            break;
        default:
            if (items.value[currentIndex.value]?.uid === vm?.uid) {
                style['transform'] = `translateX(0)`
            } else if (prevIndex.value != -1 && items.value[prevIndex.value].uid === vm?.uid) {
                style['transform'] = `translateX(-100%)`
            } else if (nextIndex.value != -1 && items.value[nextIndex.value]?.uid === vm?.uid) { 
                style['transform'] = `translateX(100%)`
                style['transition'] = `all 0s`
            }
            break;
    }

    return style
})

onMounted(() => {
    addItem({
        uid: vm?.uid,
    })
})
onUnmounted(() => {
    removeItem({ uid: vm?.uid, })
})
</script>
<style scoped lang="scss">
.carousel-item-contant {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #f0f0f0;
    // transform: translateX(100%);
    transition: all .6s;
}
</style>