<template>
    <div class="tab-bar">
        <span @click="switchTab(nav.name)" v-for="(nav, index) in navs" :key="index">
            {{ nav.title }}
        </span>
    </div>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps({
    navs: {
        type: Array,
        default: []
    }
})

const switchTab = (routeName: string) => {
    router.push({
        name: routeName
    })
}
</script>
<style scoped lang="scss">
.tab-bar {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;

    >span {
        cursor: pointer;
    }
}
</style>