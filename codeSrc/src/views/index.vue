<template>
    <div class="container" ref="node">
        <Carousel :height="height">
            <CarouselItem v-for="i in list" :key="i.name">
                <div :class="i.className" style="height: 100%; justify-content: center; align-items: center; " class="flex">
                    <!-- <h1>
                        {{ i.name }}
                    </h1> -->
                </div>
            </CarouselItem>
        </Carousel>
    </div>
</template>
<script setup lang="ts">
import {
    Carousel,
    CarouselItem
} from "../components/Carousel/index";
import { ref,computed } from 'vue'
const list = ref([
    { name: '五子棋', className: 'gobang' },
    { name: '别踩白块', className: 'stepblack' },
    { name: '音乐', className: 'music' },
])

const node = ref()

const height = computed(() => {
    return node.value?.clientHeight || 0
})

</script>
<style lang="scss" scoped>

.container {
    height: calc(100vh - var(--tab-bar-height));
}
.music {
    background: url('../assets/images/music.jpg') no-repeat center;
    background-size: contain;
}

.gobang {
    background: url('../assets/images/gobang.jpg') no-repeat center;
    background-size: contain;
}
.stepblack {
    background: url('../assets/images/stepblack.jpg') no-repeat center;
    background-size: contain;
}
</style>